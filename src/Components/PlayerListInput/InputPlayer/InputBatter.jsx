import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const InputBatter = (props) => {
  let team = props.team;

  const [batterNum, setBatterNum] = useState("1");

  const handleBatterNum = (event) => {
    setBatterNum(event.target.value);
  };

  const inputBatterNum = (
    <Row className="mb-3" key={team + "InputBatterNum"}>
      <Form.Group as={Col} xs="6" controlId={team + "BatterNum"}>
        <Form.Label>
          {team === "home" ? "主隊打者人數" : "客隊打者人數"}
        </Form.Label>
        <Form.Select
          value={batterNum}
          onChange={handleBatterNum}
          aria-label={team + "BatterNum"}
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

  const batterListLabel = (
    <Row key={team + "batterListLabel"}>
      <Form.Label as={Col} xs="4">
        背號(0~99)
      </Form.Label>
      <Form.Label as={Col} xs="8">
        {team === "home" ? "主隊打者姓名" : "客隊打者姓名"}
      </Form.Label>
    </Row>
  );

  const batterList = [inputBatterNum, batterListLabel];
  for (let i = 1; i <= batterNum; i++) {
    batterList.push(
      <Row className="mb-3" key={i}>
        <Form.Group as={Col} xs="4" controlId={team + "BatterSerialNum" + i}>
          <Form.Label>{i}棒</Form.Label>
          <Form.Control type="number" min="0" max="99" step="1" required />
          <Form.Control.Feedback type="invalid">
            請填寫 0 ~ 99 的正整數
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs="8" controlId={team + "BatterName" + i}>
          <Form.Label>姓名</Form.Label>
          <Form.Control type="text" required />
          <Form.Control.Feedback type="invalid">
            請填寫打者姓名
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
  }
  return <>{batterList}</>;
};

export default InputBatter;
