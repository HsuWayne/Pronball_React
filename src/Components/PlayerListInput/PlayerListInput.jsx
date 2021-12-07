import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
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
  halfInningHandle,
} from "../../store/slice/gameDataSlice";

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
    dispatch(halfInningHandle());
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
          <Row className="mb-3">
            <Form.Group as={Col} xs="6" controlId="Inning select">
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
