import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
import "./PlayerListInput.css";
import InputPlayer from "./InputPlayer/InputPlayer";
import Player from "./Player";

function PlayerListInput(props) {
  const [validated, setValidated] = useState(false);
  const [homeBatterList, setHomeBatterList] = useState([
    {
      batterSerialNum: "",
      batterName: "",
    },
  ]);
  const [awayBatterList, setAwayBatterList] = useState([
    {
      batterSerialNum: "",
      batterName: "",
    },
  ]);
  const [homePitcherList, setHomePitcherList] = useState({
    pitcherSerialNum: "",
    pitcherName: "",
  });
  const [awayPitcherList, setAwayPitcherList] = useState({
    pitcherSerialNum: "",
    pitcherName: "",
  });

  const handlePlayerList = () => {
    props.setHomePitcher([
      new Player(homePitcherList.pitcherSerialNum, homePitcherList.pitcherName),
    ]);
    props.setAwayPitcher([
      new Player(awayPitcherList.pitcherSerialNum, awayPitcherList.pitcherName),
    ]);
    props.setHomeBatters(
      homeBatterList.map((batter) => {
        return new Player(batter.batterSerialNum, batter.batterName);
      })
    );
    props.setAwayBatters(
      awayBatterList.map((batter) => {
        return new Player(batter.batterSerialNum, batter.batterName);
      })
    );
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
                value={props.inning}
                aria-label="Inning select"
                onChange={(e) => props.setInning(e.target.value)}
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
