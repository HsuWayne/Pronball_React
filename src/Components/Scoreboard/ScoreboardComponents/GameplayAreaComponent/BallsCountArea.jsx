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
    if (gameData.strike === 3) {
      dispatch(strikeout());
      dispatch(resetBallsCount());
      if (gameData.out < 2) {
        dispatch(changeBatter());
      }
    }
  }, [dispatch, gameData.strike, gameData.out]);

  useEffect(() => {
    if (gameData.ball === 4) {
      dispatch(walk());
      dispatch(resetBallsCount());
      dispatch(changeBatter());
    }
  }, [dispatch, gameData.ball]);

  useEffect(() => {
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
