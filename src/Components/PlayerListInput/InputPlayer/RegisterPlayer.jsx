import React, { useState, useCallback } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { doc, setDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePlayerListFromDB } from "../../../store/slice/gameDataSlice";
import playersFromDB from "../../../firebase";

function RegisterPlayer(props) {
  const { registerPlayerShow, setRegisterPlayerShow } = props;
  const gameData = useSelector((state) => state.gameData);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    serialNum: "",
    name: "",
  });
  const [registerOK, setRegisterOK] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === true) {
      handleRegister(newPlayer.name, newPlayer.serialNum);
      setNewPlayer({
        serialNum: "",
        name: "",
      });
      setValidated(false);
    }
  };

  const registerPlayer = async (name, serialNum) => {
    await setDoc(doc(playersFromDB, name), {
      serialNumber: serialNum,
      pitcher: {
        strike: 0,
        ball: 0,
        er: 0,
        ira: 0,
        k: 0,
        o: 0,
        goPit: 0,
        aoPit: 0,
        bbPit: 0,
        dpPit: 0,
        h: 0,
        hr: 0,
        gamePlayed: 0,
      },
      batter: {
        single: 0,
        double: 0,
        triple: 0,
        homerun: 0,
        rbi: 0,
        runs: 0,
        bb: 0,
        so: 0,
        go: 0,
        ao: 0,
        dp: 0,
        sf: 0,
        sh: 0,
        gamePlayed: 0,
      },
    })
      .then(() => {
        setRegisterOK(true);
        getFirebasePlayer();
      })
      .catch(() => setRegisterFail(true));
  };

  const handleRegister = (name, serialNum) => {
    let checkPlayerName = true;
    for (let player of gameData.playerListFromDB) {
      if (player.name === name) {
        checkPlayerName = false;
        setRegisterFail(true);
      }
    }
    if (checkPlayerName) {
      registerPlayer(name, serialNum);
    }
  };

  const getFirebasePlayer = useCallback(() => {
    async function gettingFirebasePlayer() {
      const playerList = [];
      const queryPlayer = await getDocs(
        query(playersFromDB, orderBy("serialNumber"))
      );
      queryPlayer.forEach((player) => {
        playerList.push({
          name: player.id,
          serialNum: player.data().serialNumber,
        });
      });
      dispatch(updatePlayerListFromDB(playerList));
    }
    gettingFirebasePlayer();
  }, [dispatch]);

  return (
    <Modal
      show={registerPlayerShow}
      onHide={() => {
        setRegisterPlayerShow(false);
        setRegisterOK(false);
        setRegisterFail(false);
        setValidated(false);
        setNewPlayer({
          serialNum: "",
          name: "",
        });
      }}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>???????????????</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            className="playerForm"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="playerForm_subtitle">??????????????????</div>
            <Row className="mb-3">
              <Form.Group as={Col} xs="4" controlId={"newPlayerSerialNum"}>
                <Form.Label>??????(0~99)</Form.Label>
                <Form.Control
                  value={newPlayer.serialNum}
                  onFocus={() => {
                    setRegisterOK(false);
                    setRegisterFail(false);
                  }}
                  onChange={(e) =>
                    setNewPlayer({
                      ...newPlayer,
                      serialNum: e.target.value,
                    })
                  }
                  type="number"
                  min="0"
                  max="99"
                  step="1"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  ????????? 0 ~ 99 ????????????
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs="8" controlId={"newPlayerName"}>
                <Form.Label>??????</Form.Label>
                <Form.Control
                  value={newPlayer.name}
                  onFocus={() => {
                    setRegisterOK(false);
                    setRegisterFail(false);
                  }}
                  onChange={(e) =>
                    setNewPlayer({
                      ...newPlayer,
                      name: e.target.value,
                    })
                  }
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  ???????????????
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {registerOK ? (
              <Alert variant="success" className="text-center">
                ????????????
              </Alert>
            ) : null}
            {registerFail ? (
              <Alert variant="danger" className="text-center">
                ????????????
              </Alert>
            ) : null}
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setRegisterPlayerShow(false);
                  setRegisterOK(false);
                  setRegisterFail(false);
                  setValidated(false);
                  setNewPlayer({
                    serialNum: "",
                    name: "",
                  });
                }}
              >
                ??????
              </Button>
              <Button variant="primary" type="submit">
                ??????
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterPlayer;
