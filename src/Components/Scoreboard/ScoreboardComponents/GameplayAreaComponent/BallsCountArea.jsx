import { Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  strikeBall,
  ballBall,
  foulBall,
  resetBallsCount,
  strikeout,
  walk,
  updateScored,
  updateRunner,
  updateRunnerBase,
  updatePitcherEr,
  updatePitcherIra,
  updateRunnerRuns,
  updateBatterRbi,
  halfInningHandle,
  changeBatter,
} from "../../../../store/slice/gameDataSlice";
import { useSelector } from "react-redux";

function BallsCountArea() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const handleStrike = () => {
    dispatch(strikeBall());
  };
  const handleBall = () => {
    dispatch(ballBall());
  };
  const handleFoul = () => {
    if (gameData.strike === 2) {
      return dispatch(foulBall());
    }
    dispatch(strikeBall());
  };

  useEffect(() => {
    //三振
    if (gameData.strike === 3) {
      dispatch(strikeout());
      dispatch(resetBallsCount());
      if (gameData.out < 2) {
        dispatch(changeBatter());
      }
    }
  }, [dispatch, gameData.strike, gameData.out]);

  useEffect(() => {
    //四壞球時跑壘及得分判定
    if (gameData.ball === 4) {
      dispatch(walk());
      dispatch(resetBallsCount());
      const runner = [...gameData.runner];
      const runnerBase = [...gameData.runnerBase];
      runner.push([gameData.batting[0], gameData.pitching[0]]);
      runnerBase.push(0);
      runnerBase.reverse();
      for (let i = 0; i < runnerBase.length; i++) {
        if (runnerBase[i] === i) {
          runnerBase[i]++;
        }
      }
      runnerBase.reverse();
      if (runnerBase[0] === 4) {
        dispatch(updatePitcherEr(runner[0][1].name));
        if (runner[0][1].name !== gameData.pitching[0].name) {
          dispatch(updatePitcherIra());
        }
        dispatch(updateRunnerRuns(runner[0][0].orderNumber));
        dispatch(updateBatterRbi());
        runnerBase.shift();
        runner.shift();
        dispatch(updateScored());
      }
      dispatch(updateRunner(runner));
      dispatch(updateRunnerBase(runnerBase));
      dispatch(changeBatter());
    }
  }, [
    dispatch,
    gameData.ball,
    gameData.runner,
    gameData.runnerBase,
    gameData.batting,
    gameData.pitching,
  ]);

  useEffect(() => {
    //三出局
    if (gameData.out === 3) {
      dispatch(halfInningHandle());
    }
  }, [dispatch, gameData.out]);

  return (
    <>
      <Row className="scoreboard_bat_area">
        <Col
          xs="4"
          className="scoreboard_bat_area_ball scoreboard_elements"
          onClick={handleBall}
        >
          壞球
        </Col>
        <Col
          xs="4"
          className="scoreboard_bat_area_strike scoreboard_elements"
          onClick={handleStrike}
        >
          好球
        </Col>
        <Col
          xs="4"
          className="scoreboard_bat_area_ball scoreboard_elements"
          onClick={handleBall}
        >
          壞球
        </Col>
      </Row>
      <Row className="scoreboard_foul_area scoreboard_elements">
        <Col xs="12" onClick={handleFoul}>
          界外
        </Col>
      </Row>
    </>
  );
}

export default BallsCountArea;
