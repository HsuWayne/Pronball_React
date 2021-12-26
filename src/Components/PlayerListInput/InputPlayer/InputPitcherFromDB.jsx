import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const InputPitcherFromDB = (props) => {
  const { team, pitcherList, setPitcherList } = props;
  const gameData = useSelector((state) => state.gameData);

  useEffect(() => {
    setPitcherList({
      pitcherSerialNum: gameData.playerListFromDB[0].serialNum,
      pitcherName: gameData.playerListFromDB[0].name,
    });
  }, [setPitcherList, gameData.playerListFromDB]);

  const handlePitcherInput = (e) => {
    const pitcher = gameData.playerListFromDB.find(
      (player) => player.name === e.target.value
    );
    setPitcherList({
      pitcherSerialNum: pitcher.serialNum,
      pitcherName: pitcher.name,
    });
  };

  return (
    <Row className="mb-3">
      <Form.Group as={Col} controlId="selectPlayer">
        <Form.Label>
          {team === "home" ? "選擇主隊先發投手" : "選擇客隊先發投手"}
        </Form.Label>
        <Form.Select
          as={Col}
          xs="5"
          aria-label="Pitcher player select list"
          required
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
      <Form.Group
        as={Col}
        xs="2"
        md={{ span: 2, offset: 1 }}
        controlId={team + "PitcherSerialNum"}
      >
        <Form.Label>背號</Form.Label>
        <Form.Control
          value={pitcherList.pitcherSerialNum}
          type="number"
          min="0"
          max="99"
          step="1"
          plaintext
          readOnly
        />
      </Form.Group>
      <Form.Group
        as={Col}
        xs="5"
        md={{ span: 4 }}
        controlId={team + "PitcherName"}
      >
        <Form.Label>姓名</Form.Label>
        <Form.Control
          value={pitcherList.pitcherName}
          type="text"
          plaintext
          readOnly
        />
      </Form.Group>
    </Row>
  );
};

export default InputPitcherFromDB;
