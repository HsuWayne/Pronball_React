import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RegisterPlayer from "../../../../PlayerListInput/InputPlayer/RegisterPlayer";

function ChangePitcherFromDB(props) {
  const { setChangePitching } = props;
  const [registerPlayerShow, setRegisterPlayerShow] = useState(false);
  const gameData = useSelector((state) => state.gameData);

  useEffect(() => {
    setChangePitching({
      serialNum: gameData.playerListFromDB[0].serialNum,
      name: gameData.playerListFromDB[0].name,
    });
  }, [setChangePitching, gameData.playerListFromDB]);

  const handlePitcherInput = (e) => {
    const pitcher = gameData.playerListFromDB.find(
      (player) => player.name === e.target.value
    );
    setChangePitching({
      serialNum: pitcher.serialNum,
      name: pitcher.name,
    });
  };

  return (
    <Row className="mb-3">
      <Form.Group as={Col} xs="6" controlId="selectPlayer">
        <Form.Select
          aria-label="Pitcher player select list"
          onChange={handlePitcherInput}
        >
          {gameData.playerListFromDB.map((player, index) => {
            return (
              <option key={"player" + index} value={player.name}>
                {"( " + player.serialNum + " ) " + player.name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Col xs={{ span: 5, offset: 1 }} className="mb-3">
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
    </Row>
  );
}

export default ChangePitcherFromDB;
