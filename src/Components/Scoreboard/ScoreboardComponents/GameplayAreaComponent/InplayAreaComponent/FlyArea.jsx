import { Modal, Button, Stack } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  resetBallsCount,
  flyOut,
  sacrificeFly,
  updateScored,
  updateRunner,
  updateRunnerBase,
  updatePitcherEr,
  updatePitcherIra,
  updateRunnerRuns,
  updateBatterRbi,
  changeBatter,
} from "../../../../../store/slice/gameDataSlice";

function FlyArea(props) {
  const { flyAreaShow, setFlyAreaShow, flyToRight, handleHit } = props;
  const gameData = useSelector((state) => state.gameData);
  const dispatch = useDispatch();

  const handleFlyOut = () => {
    setFlyAreaShow(false);
    if (gameData.charge) {
      handleHit(1);
    } else {
      dispatch(flyOut());
      dispatch(resetBallsCount());
    }
  };

  const handlePowerFlyToRight = () => {
    setFlyAreaShow(false);
    dispatch(resetBallsCount());
    if (gameData.charge) {
      handleHit(1);
    } else if (gameData.out <= 1) {
      const runner = [...gameData.runner];
      const runnerBase = [...gameData.runnerBase];
      if (runnerBase[0] === 3) {
        if (runnerBase[1] === 2) {
          runnerBase[1]++;
        }
        dispatch(updatePitcherEr(runner[0][1].name));
        if (runner[0][1].name !== gameData.pitching[0].name) {
          dispatch(updatePitcherIra());
        }
        dispatch(updateRunnerRuns(runner[0][0].orderNumber));
        dispatch(updateBatterRbi());
        dispatch(updateScored());
        runnerBase.shift();
        runner.shift();
        dispatch(updateRunner(runner));
        dispatch(updateRunnerBase(runnerBase));
        dispatch(sacrificeFly());
        dispatch(changeBatter());
      } else if (runnerBase[0] === 2) {
        runnerBase[0]++;
        dispatch(updateRunnerBase(runnerBase));
        dispatch(flyOut());
      }
    } else {
      dispatch(flyOut());
    }
  };

  const handlePowerFlyToLeft = () => {
    setFlyAreaShow(false);
    dispatch(resetBallsCount());
    if (gameData.charge) {
      handleHit(1);
    } else if (gameData.out <= 1 && gameData.runnerBase[0] === 3) {
      const runner = [...gameData.runner];
      const runnerBase = [...gameData.runnerBase];
      dispatch(updatePitcherEr(runner[0][1].name));
      if (runner[0][1].name !== gameData.pitching[0].name) {
        dispatch(updatePitcherIra());
      }
      dispatch(updateRunnerRuns(runner[0][0].orderNumber));
      dispatch(updateBatterRbi());
      dispatch(updateScored());
      runnerBase.shift();
      runner.shift();
      dispatch(updateRunner(runner));
      dispatch(updateRunnerBase(runnerBase));
      dispatch(sacrificeFly());
      dispatch(changeBatter());
    } else {
      dispatch(flyOut());
    }
  };

  return (
    <Modal
      show={flyAreaShow}
      onHide={() => setFlyAreaShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>請選擇擊球結果</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal" className="justify-content-evenly">
          <Button
            variant="outline-warning"
            onClick={() => {
              setFlyAreaShow(false);
              handleHit(1);
            }}
          >
            一壘安打
          </Button>
          <Button variant="outline-info" onClick={handleFlyOut}>
            飛球出局
          </Button>
          <Button
            variant="outline-success"
            onClick={flyToRight ? handlePowerFlyToRight : handlePowerFlyToLeft}
          >
            強力飛球出局
          </Button>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setFlyAreaShow(false)}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FlyArea;
