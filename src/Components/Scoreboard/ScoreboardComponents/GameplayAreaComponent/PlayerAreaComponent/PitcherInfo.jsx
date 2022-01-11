import React, { useState } from "react";
import { Modal, Button, Table, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  changePitcher,
  setCharge,
} from "../../../../../store/slice/gameDataSlice";
import { useSelector } from "react-redux";
import { defaultPitcher } from "../../../../PlayerListInput/Player";
import ChangePitcher from "./ChangePitcher";
import ChangePitcherFromDB from "./ChangePitcherFromDB";

function PitcherInfo(props) {
  const { pitcherShow, setPitcherShow } = props;
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const [validated, setValidated] = useState(false);
  const [changePitching, setChangePitching] = useState({
    serialNum: "",
    name: "",
  });
  const pitchingOrder = [...gameData.pitching].reverse();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === true) {
      dispatch(
        changePitcher({
          ...defaultPitcher,
          serialNum: changePitching.serialNum,
          name: changePitching.name,
        })
      );
      setChangePitching({
        serialNum: "",
        name: "",
      });
      setPitcherShow(false);
      setValidated(false);
    }
  };

  return (
    <Modal
      show={pitcherShow}
      onHide={() => setPitcherShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>投手資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <thead>
            <tr>
              <th>背號</th>
              <th>姓名</th>
              <th>IP</th>
              <th>H</th>
              <th>HR</th>
              <th>ER</th>
              <th>BB</th>
              <th>SO</th>
              <th>球數</th>
            </tr>
          </thead>
          <tbody>
            {pitchingOrder.map((pitcher, index) => {
              return (
                <tr key={"pitcher" + index}>
                  <td>{pitcher.serialNum}</td>
                  <td>{pitcher.name}</td>
                  <td>{parseInt(pitcher.o / 3) + (pitcher.o % 3) / 10}</td>
                  <td>{pitcher.h}</td>
                  <td>{pitcher.hr}</td>
                  <td>{pitcher.er}</td>
                  <td>{pitcher.bbPit}</td>
                  <td>{pitcher.k}</td>
                  <td>
                    {pitcher.strike +
                      pitcher.ball +
                      "(" +
                      pitcher.strike +
                      ":" +
                      pitcher.ball +
                      ")"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {gameData.runner.length > 1 &&
        gameData.runnerBase[gameData.runnerBase.length - 2] === 2 &&
        gameData.out < 2 &&
        !gameData.charge ? (
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(setCharge());
              setPitcherShow(false);
            }}
          >
            趨前守備
          </Button>
        ) : gameData.charge ? (
          <Button
            variant="primary"
            onClick={() => {
              dispatch(setCharge());
              setPitcherShow(false);
            }}
          >
            趨前守備 已開啟
          </Button>
        ) : (
          <Button variant="outline-primary" disabled>
            趨前守備
          </Button>
        )}
      </Modal.Body>
      <hr />
      <Container fluid>
        <Form
          className="playerForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="playerForm_subtitle">更換投手</div>
          {gameData.playerListFromDB.length === 0 ? (
            <ChangePitcher
              changePitching={changePitching}
              setChangePitching={setChangePitching}
            />
          ) : (
            <ChangePitcherFromDB setChangePitching={setChangePitching} />
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setPitcherShow(false)}>
              關閉
            </Button>
            <Button variant="primary" type="submit">
              更換投手
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
}

export default PitcherInfo;
