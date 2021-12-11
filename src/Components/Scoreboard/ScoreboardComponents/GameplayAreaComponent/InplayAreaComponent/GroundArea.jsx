import { Modal, Button, Stack } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  resetBallsCount,
  groundOut,
  sacrificeHit,
  doublePlay,
  updateScored,
  updateRunner,
  updateRunnerBase,
  updatePitcherEr,
  updatePitcherIra,
  updateRunnerRuns,
  updateBatterRbi,
  changeBatter,
} from "../../../../../store/slice/gameDataSlice";

function GroundArea(props) {
  const { groundAreaShow, setGroundAreaShow, groundToRight } = props;
  const gameData = useSelector((state) => state.gameData);
  const dispatch = useDispatch();

  const handleGroundToRight = () => {
    setGroundAreaShow(false);
    const runner = [...gameData.runner];
    const runnerBase = [...gameData.runnerBase];
    if (gameData.charge) {
      dispatch(doublePlay());
      runnerBase.shift();
      runner.shift();
      runnerBase.forEach(function (element, index, array) {
        array[index]++;
      });
    } else {
      if (runnerBase[0] === 3) {
        if (runnerBase[runnerBase.length - 1] !== 1 || gameData.out !== 1) {
          if (runnerBase[1] === 2) {
            runnerBase[1]++;
          }
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
      } else if (runnerBase[0] === 2) {
        runnerBase[0]++;
      }
      if (runnerBase[runnerBase.length - 1] === 1) {
        dispatch(doublePlay());
        runnerBase.pop();
        runner.pop();
      }
    }
    dispatch(updateRunner(runner));
    dispatch(updateRunnerBase(runnerBase));
    dispatch(groundOut());
    dispatch(resetBallsCount());
  };

  const handleGroundToLeft = () => {
    setGroundAreaShow(false);
    const runner = [...gameData.runner];
    const runnerBase = [...gameData.runnerBase];
    if (gameData.charge) {
      dispatch(doublePlay());
      runnerBase.shift();
      runner.shift();
      runnerBase.forEach(function (element, index, array) {
        array[index]++;
      });
    } else if (runnerBase[runnerBase.length - 1] === 1) {
      dispatch(doublePlay());
      runnerBase.pop();
      runner.pop();
    }
    dispatch(updateRunner(runner));
    dispatch(updateRunnerBase(runnerBase));
    dispatch(groundOut());
    dispatch(resetBallsCount());
  };

  const handleChargeToRight = () => {
    setGroundAreaShow(false);
    const runner = [...gameData.runner];
    const runnerBase = [...gameData.runnerBase];
    runnerBase.forEach(function (element, index, array) {
      array[index]++;
    });
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
    dispatch(resetBallsCount());
    dispatch(sacrificeHit());
    dispatch(changeBatter());
  };

  const handleChargeToLeft = () => {
    setGroundAreaShow(false);
    dispatch(resetBallsCount());
    dispatch(groundOut());
  };

  return (
    <Modal
      show={groundAreaShow}
      onHide={() => setGroundAreaShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>請選擇滾地球種類</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal" className="justify-content-evenly">
          <Button
            variant="outline-info"
            onClick={groundToRight ? handleGroundToRight : handleGroundToLeft}
          >
            滾地球出局
          </Button>
          <Button
            variant="outline-success"
            onClick={groundToRight ? handleChargeToRight : handleChargeToLeft}
          >
            犧牲觸擊
          </Button>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setGroundAreaShow(false)}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroundArea;
