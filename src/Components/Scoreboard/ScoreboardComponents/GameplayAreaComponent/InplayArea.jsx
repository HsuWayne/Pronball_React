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
import FlyArea from "./InplayAreaComponent/FlyArea";

function InplayArea() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const [groundAreaShow, setGroundAreaShow] = useState(false);
  const [groundToRight, setGroundToRight] = useState(false);
  const [flyAreaShow, setFlyAreaShow] = useState(false);
  const [flyToRight, setFlyToRight] = useState(false);

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
          ???????????????
          <br />
          (??????????????????????????????)
          <br />
          ?????????????????????
        </Col>
        <Col
          xs="6"
          className="scoreboard_ground_area scoreboard_elements"
          onClick={() => {
            setGroundToRight(false);
            handleGroundOut();
          }}
        >
          ???????????????
          <br />
          (??????????????????????????????)
          <br />
          ?????????????????????
        </Col>
      </Row>
      <GroundArea
        groundAreaShow={groundAreaShow}
        setGroundAreaShow={setGroundAreaShow}
        groundToRight={groundToRight}
      />
      <Row>
        <Col
          xs="6"
          className="scoreboard_fly_area scoreboard_elements"
          onClick={() => {
            setFlyToRight(true);
            setFlyAreaShow(true);
          }}
        >
          ?????????????????????
          <br />
          ???????????????
          <br />
          (?????????????????????)
        </Col>
        <Col
          xs="6"
          className="scoreboard_fly_area scoreboard_elements"
          onClick={() => {
            setFlyToRight(false);
            setFlyAreaShow(true);
          }}
        >
          ?????????????????????
          <br />
          ???????????????
          <br />
          (??????????????????)
        </Col>
      </Row>
      <FlyArea
        flyAreaShow={flyAreaShow}
        setFlyAreaShow={setFlyAreaShow}
        flyToRight={flyToRight}
        handleHit={handleHit}
      />
      <Row className="scoreboard_single_area scoreboard_elements">
        <Col xs="12" onClick={() => handleHit(1)}>
          ???????????????
          <br />
          (????????????)
        </Col>
      </Row>
      <Row>
        <Col
          xs="4"
          className="scoreboard_triple_area scoreboard_elements"
          onClick={() => handleHit(3)}
        >
          ????????????
        </Col>
        <Col
          xs="8"
          className="scoreboard_double_area scoreboard_elements"
          onClick={() => handleHit(2)}
        >
          ???????????????
        </Col>
      </Row>
      <Row className="scoreboard_homerun_area scoreboard_elements">
        <Col xs="12" onClick={() => handleHit(4)}>
          ?????????
        </Col>
      </Row>
    </>
  );
}

export default InplayArea;
