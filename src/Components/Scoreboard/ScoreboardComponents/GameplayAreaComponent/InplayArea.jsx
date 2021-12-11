import { Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetBallsCount,
  updateHit,
  groundOut,
  updateScored,
  updateRunner,
  updateRunnerBase,
  updatePitcherEr,
  updatePitcherIra,
  updateRunnerRuns,
  updateBatterRbi,
  changeBatter,
} from "../../../../store/slice/gameDataSlice";
import { useSelector } from "react-redux";
import GroundArea from "./InplayAreaComponent/GroundArea";

function InplayArea() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const [groundAreaShow, setGroundAreaShow] = useState(false);
  const [groundToRight, setGroundToRight] = useState(false);
  // const [flyAreaShow, setFlyAreaShow] = useState(false);

  const handleHit = (base) => {
    dispatch(updateHit(base));
    dispatch(resetBallsCount());
    const runner = [...gameData.runner];
    const runnerBase = [...gameData.runnerBase];
    runner.push([gameData.batting[0], gameData.pitching[0]]);
    runnerBase.push(0);
    runnerBase.forEach(function (element, index, array) {
      array[index] = element + base;
    });
    runnerBase.forEach(function (element, index) {
      if (element > 3) {
        dispatch(updatePitcherEr(runner[0][1].name));
        if (runner[index][1].name !== gameData.pitching[0].name) {
          dispatch(updatePitcherIra());
        }
        dispatch(updateRunnerRuns(runner[index][0].orderNumber));
        dispatch(updateBatterRbi());
        dispatch(updateScored());
      }
    });
    const runnerToHome = runnerBase.filter((element) => element > 3).length;
    runnerBase.splice(0, runnerToHome);
    runner.splice(0, runnerToHome);
    dispatch(updateRunner(runner));
    dispatch(updateRunnerBase(runnerBase));
    dispatch(changeBatter());
  };

  const handleGroundOut = () => {
    if (gameData.runner.length > 0 && gameData.out <= 1) {
      setGroundAreaShow(true);
    } else {
      dispatch(resetBallsCount());
      dispatch(groundOut());
    }
  };

  return (
    <>
      <Row>
        <Col
          xs="6"
          className="scoreboard_ground_area scoreboard_elements"
          onClick={() => {
            setGroundToRight(true);
            handleGroundOut();
          }}
        >
          滾地出局區
          <br />
          (一壘雙殺，二三壘推進)
          <br />
          犧牲觸擊成功區
        </Col>
        <Col
          xs="6"
          className="scoreboard_ground_area scoreboard_elements"
          onClick={() => {
            setGroundToRight(false);
            handleGroundOut();
          }}
        >
          滾地出局區
          <br />
          (一壘雙殺，二三壘不動)
          <br />
          犧牲觸擊失敗區
        </Col>
      </Row>
      <GroundArea
        groundAreaShow={groundAreaShow}
        setGroundAreaShow={setGroundAreaShow}
        groundToRight={groundToRight}
      />
      <Row>
        <Col xs="6" className="scoreboard_fly_area scoreboard_elements">
          直接一壘安打區
          <br />
          強力飛球區
          <br />
          (二三壘跑者推進)
        </Col>
        <Col xs="6" className="scoreboard_fly_area scoreboard_elements">
          直接一壘安打區
          <br />
          強力飛球區
          <br />
          (三壘跑者推進)
        </Col>
      </Row>
      <Row className="scoreboard_single_area scoreboard_elements">
        <Col xs="12" onClick={() => handleHit(1)}>
          一壘安打區
          <br />
          (飛球落地)
        </Col>
      </Row>
      <Row>
        <Col
          xs="4"
          className="scoreboard_triple_area scoreboard_elements"
          onClick={() => handleHit(3)}
        >
          三壘安打
        </Col>
        <Col
          xs="8"
          className="scoreboard_double_area scoreboard_elements"
          onClick={() => handleHit(2)}
        >
          二壘安打區
        </Col>
      </Row>
      <Row className="scoreboard_homerun_area scoreboard_elements">
        <Col xs="12" onClick={() => handleHit(4)}>
          全壘打
        </Col>
      </Row>
    </>
  );
}

export default InplayArea;
