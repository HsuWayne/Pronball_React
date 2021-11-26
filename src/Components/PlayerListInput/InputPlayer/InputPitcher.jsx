import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const InputPitcher = (props) => {
  let team = props.team;
  return (
    <Row className="mb-3">
      <Form.Group as={Col} xs="4" controlId={team + "PitcherSerialNum"}>
        <Form.Label>背號(0~99)</Form.Label>
        <Form.Control type="number" min="0" max="99" step="1" required />
        <Form.Control.Feedback type="invalid">
          請填寫 0 ~ 99 的正整數
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} xs="8" controlId={team + "PitcherName"}>
        <Form.Label>
          {team === "home" ? "主隊先發投手姓名" : "客隊先發投手姓名"}
        </Form.Label>
        <Form.Control type="text" required />
        <Form.Control.Feedback type="invalid">
          {team === "home"
            ? "請填寫主隊先發投手姓名"
            : "請填寫客隊先發投手姓名"}
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
};

export default InputPitcher;
