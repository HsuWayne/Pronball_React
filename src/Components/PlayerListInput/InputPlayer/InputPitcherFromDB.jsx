import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const InputPitcherFromDB = (props) => {
  const { team, setPitcherList } = props;
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
      <Form.Group
        as={Col}
        xs={{ span: 10, offset: 1 }}
        md={{ span: 6, offset: 3 }}
        controlId="selectPlayer"
      >
        <Form.Label>
          {team === "home" ? "選擇主隊先發投手" : "選擇客隊先發投手"}
        </Form.Label>
        <Form.Select
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
    </Row>
  );
};

export default InputPitcherFromDB;
