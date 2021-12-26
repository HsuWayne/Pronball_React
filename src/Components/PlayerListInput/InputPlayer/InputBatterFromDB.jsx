import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const InputBatterFromDB = (props) => {
  let { team, batterList, setBatterList } = props;
  const gameData = useSelector((state) => state.gameData);

  const [battersNum, setBattersNum] = useState("1");

  useEffect(() => {
    const newBatterList = [];
    for (let i = 1; i <= battersNum; i++) {
      newBatterList.push({
        batterSerialNum: gameData.playerListFromDB[i - 1].serialNum,
        batterName: gameData.playerListFromDB[i - 1].name,
        orderNumber: i,
      });
    }
    setBatterList(newBatterList);
  }, [setBatterList, battersNum, gameData.playerListFromDB]);

  const handleBatterInput = (e) => {
    const batterIndex = gameData.playerListFromDB.findIndex(
      (player) => player.name === e.target.value
    );
    const newBatter = batterList.map((batter, index) => {
      if (e.target.id === team + "Batter" + (index + 1)) {
        return {
          batterName: gameData.playerListFromDB[batterIndex].name,
          batterSerialNum: gameData.playerListFromDB[batterIndex].serialNum,
          orderNumber: index + 1,
        };
      }
      return batter;
    });

    setBatterList(newBatter);
  };

  const batterNumSelect = [];
  for (let i = 1; i <= gameData.playerListFromDB.length; i++) {
    if (i <= 9) {
      batterNumSelect.push(
        <option key={"player" + i} value={i}>
          {i}
        </option>
      );
    }
  }

  const inputBattersNum = (
    <Row className="mb-3" key={team + "InputBattersNum"}>
      <Form.Group as={Col} xs="6" controlId={team + "BattersNum"}>
        <Form.Label>
          {team === "home" ? "主隊打者人數" : "客隊打者人數"}
        </Form.Label>
        <Form.Select
          value={battersNum}
          onChange={(e) => {
            setBattersNum(e.target.value);
          }}
          aria-label={team + "BattersNum"}
        >
          {batterNumSelect}
        </Form.Select>
      </Form.Group>
    </Row>
  );

  const battersListLabel = (
    <Row key={team + "batterListLabel"}>
      <Form.Label>
        {team === "home" ? "選擇主隊打者" : "選擇客隊打者"}
      </Form.Label>
    </Row>
  );

  const battersList = [inputBattersNum, battersListLabel];
  for (let i = 1; i <= battersNum; i++) {
    battersList.push(
      <Row className="mb-3" key={i}>
        <Form.Group as={Col} xs="5" controlId={team + "Batter" + i}>
          <Form.Label>{i}棒</Form.Label>
          <Form.Select
            as={Col}
            xs="5"
            aria-label="Batter player select list"
            required
            onChange={handleBatterInput}
            defaultValue={gameData.playerListFromDB[i - 1].name}
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
          controlId={team + "BatterSerialNum" + i}
        >
          <Form.Label>背號</Form.Label>
          <Form.Control
            value={batterList[i - 1] ? batterList[i - 1].batterSerialNum : ""}
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
          controlId={team + "BatterName" + i}
        >
          <Form.Label>姓名</Form.Label>
          <Form.Control
            value={batterList[i - 1] ? batterList[i - 1].batterName : ""}
            type="text"
            plaintext
            readOnly
          />
        </Form.Group>
      </Row>
    );
  }
  return <>{battersList}</>;
};

export default InputBatterFromDB;
