import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import "./PlayerListInput.css";
import InputPlayer from "./InputPlayer/InputPlayer";
import { defaultPitcher, defaultBatter } from "./Player";
import { useDispatch } from "react-redux";
import {
  setGameInning,
  updateHomePitchers,
  updateAwayPitchers,
  updateHomeBatters,
  updateAwayBatters,
  setGameStart,
  updatePlayerListFromDB,
} from "../../store/slice/gameDataSlice";
import { getDocs, orderBy, query } from "firebase/firestore";
import PlayerListFromDB from "./InputPlayer/PlayerListFromDB";
import RegisterPlayer from "./InputPlayer/RegisterPlayer";
import playersFromDB from "../../firebase";

function PlayerListInput(props) {
  const [validated, setValidated] = useState(false);

  const [homePitcherList, setHomePitcherList] = useState({
    pitcherSerialNum: "",
    pitcherName: "",
  });
  const [awayPitcherList, setAwayPitcherList] = useState({
    pitcherSerialNum: "",
    pitcherName: "",
  });
  const [homeBatterList, setHomeBatterList] = useState([
    {
      batterSerialNum: "",
      batterName: "",
      orderNumber: "",
    },
  ]);
  const [awayBatterList, setAwayBatterList] = useState([
    {
      batterSerialNum: "",
      batterName: "",
      orderNumber: "",
    },
  ]);
  const dispatch = useDispatch();

  const [playerListFromDBShow, setPlayerListFromDBShow] = useState(false);
  const [registerPlayerShow, setRegisterPlayerShow] = useState(false);

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

  useEffect(() => getFirebasePlayer(), [getFirebasePlayer]);

  const handlePlayerList = () => {
    dispatch(
      updateHomePitchers({
        ...defaultPitcher,
        serialNum: homePitcherList.pitcherSerialNum,
        name: homePitcherList.pitcherName,
      })
    );
    dispatch(
      updateAwayPitchers({
        ...defaultPitcher,
        serialNum: awayPitcherList.pitcherSerialNum,
        name: awayPitcherList.pitcherName,
      })
    );
    const homeBatters = homeBatterList.map((batter) => {
      return {
        ...defaultBatter,
        serialNum: batter.batterSerialNum,
        name: batter.batterName,
        orderNumber: batter.orderNumber,
      };
    });
    dispatch(updateHomeBatters(homeBatters));
    const awayBatters = awayBatterList.map((batter) => {
      return {
        ...defaultBatter,
        serialNum: batter.batterSerialNum,
        name: batter.batterName,
        orderNumber: batter.orderNumber,
      };
    });
    dispatch(updateAwayBatters(awayBatters));
    dispatch(setGameStart());
  };

  const handleTestData = () => {
    dispatch(setGameInning(3));
    dispatch(
      updateHomePitchers({ ...defaultPitcher, serialNum: "04", name: "趙主投" })
    );
    dispatch(
      updateAwayPitchers({ ...defaultPitcher, serialNum: "24", name: "周客投" })
    );

    dispatch(
      updateHomeBatters([
        { ...defaultBatter, orderNumber: "1", serialNum: "01", name: "錢主一" },
        { ...defaultBatter, orderNumber: "2", serialNum: "02", name: "孫主二" },
        { ...defaultBatter, orderNumber: "3", serialNum: "03", name: "李主三" },
      ])
    );

    dispatch(
      updateAwayBatters([
        { ...defaultBatter, orderNumber: "1", serialNum: "21", name: "吳客一" },
        { ...defaultBatter, orderNumber: "2", serialNum: "22", name: "鄭客二" },
        { ...defaultBatter, orderNumber: "3", serialNum: "23", name: "王客三" },
      ])
    );
    dispatch(setGameStart());
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      handlePlayerList();
      props.setPlayerListSubmitted(true);
    }
    setValidated(true);
  };

  return (
    <div className="scoreboard_form">
      <Container>
        <div className="form_title">比賽及選手資訊登錄</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col as={Row} xs={6} md={12} className="justify-content-md-center">
              <Col xs={{ span: 11, offset: 1 }} md="auto" className="mb-3">
                <Button
                  variant="outline-primary"
                  onClick={() => setPlayerListFromDBShow(true)}
                >
                  已註冊球員名單
                </Button>
                <PlayerListFromDB
                  playerListFromDBShow={playerListFromDBShow}
                  setPlayerListFromDBShow={setPlayerListFromDBShow}
                />
              </Col>
              <Col xs={{ span: 11, offset: 1 }} md="auto" className="mb-3">
                <Button
                  variant="outline-success"
                  onClick={() => setRegisterPlayerShow(true)}
                >
                  註冊新球員
                </Button>
                <RegisterPlayer
                  registerPlayerShow={registerPlayerShow}
                  setRegisterPlayerShow={setRegisterPlayerShow}
                />
              </Col>
              <Col xs={{ span: 11, offset: 1 }} md="auto" className="mb-3">
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    handleTestData();
                    props.setPlayerListSubmitted(true);
                  }}
                >
                  帶入測試用資料
                </Button>
              </Col>
            </Col>
            <Form.Group
              as={Col}
              xs={{ span: 5, offset: 1, order: "first" }}
              md={{ span: 6, offset: 3, order: "last" }}
              controlId="Inning select"
            >
              <Form.Label>比賽局數</Form.Label>
              <Form.Select
                aria-label="Inning select"
                defaultValue={9}
                onChange={(e) => dispatch(setGameInning(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <hr />
          <InputPlayer
            team="home"
            pitcherList={homePitcherList}
            batterList={homeBatterList}
            setPitcherList={setHomePitcherList}
            setBatterList={setHomeBatterList}
          />
          <hr />
          <InputPlayer
            team="away"
            pitcherList={awayPitcherList}
            batterList={awayBatterList}
            setPitcherList={setAwayPitcherList}
            setBatterList={setAwayBatterList}
          />
          <Stack direction="horizontal">
            <Button className="ms-auto mb-3" type="submit">
              送出
            </Button>
          </Stack>
        </Form>
      </Container>
    </div>
  );
}

export default PlayerListInput;
