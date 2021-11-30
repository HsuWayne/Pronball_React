import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

const InputBatters = (props) => {
  let team = props.team;

  const [battersNum, setBattersNum] = useState("1");
  const [batters, setBatters] = useState([
    team,
    {
      batterSerialNum: "",
      batterName: "",
    },
  ]);

  const handleBattersNum = (e) => {
    setBattersNum(e.target.value);
  };

  const handleBatterSerialNum = (e) => {
    const newBatterSerialNum = batters.map((batter, index) => {
      if (e.target.id === team + "BatterSerialNum" + index) {
        return { ...batter, batterSerialNum: e.target.value };
      }
      return batter;
    });
    setBatters(newBatterSerialNum);
  };

  const handleBatterName = (e) => {
    const newBatterName = batters.map((batter, index) => {
      if (e.target.id === team + "BatterName" + index) {
        return { ...batter, batterName: e.target.value };
      }
      return batter;
    });
    setBatters(newBatterName);
  };

  useEffect(() => {
    setBatters(
      [team].concat(
        Array(parseInt(battersNum)).fill({
          batterSerialNum: "",
          batterName: "",
        })
      )
    );
  }, [team, battersNum]);

  const inputBattersNum = (
    <Row className="mb-3" key={team + "InputBattersNum"}>
      <Form.Group as={Col} xs="6" controlId={team + "BattersNum"}>
        <Form.Label>
          {team === "home" ? "主隊打者人數" : "客隊打者人數"}
        </Form.Label>
        <Form.Select
          value={battersNum}
          onChange={handleBattersNum}
          aria-label={team + "BattersNum"}
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
  );

  const battersListLabel = (
    <Row key={team + "batterListLabel"}>
      <Form.Label as={Col} xs="4">
        背號(0~99)
      </Form.Label>
      <Form.Label as={Col} xs="8">
        {team === "home" ? "主隊打者姓名" : "客隊打者姓名"}
      </Form.Label>
    </Row>
  );

  const battersList = [inputBattersNum, battersListLabel];
  for (let i = 1; i <= battersNum; i++) {
    battersList.push(
      <Row className="mb-3" key={i}>
        <Form.Group as={Col} xs="4" controlId={team + "BatterSerialNum" + i}>
          <Form.Label>{i}棒</Form.Label>
          <Form.Control
            onChange={handleBatterSerialNum}
            type="number"
            min="0"
            max="99"
            step="1"
            required
          />
          <Form.Control.Feedback type="invalid">
            請填寫 0 ~ 99 的正整數
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs="8" controlId={team + "BatterName" + i}>
          <Form.Label>姓名</Form.Label>
          <Form.Control onChange={handleBatterName} type="text" required />
          <Form.Control.Feedback type="invalid">
            請填寫打者姓名
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
  }
  return <>{battersList}</>;
};

export default InputBatters;
