import { Row, Col, Form } from "react-bootstrap";
import React from "react";

function ChangePitcher(props) {
  const { changePitching, setChangePitching } = props;
  return (
    <Row className="mb-3">
      <Form.Group as={Col} xs="4" controlId={"changePitcherSerialNum"}>
        <Form.Label>背號(0~99)</Form.Label>
        <Form.Control
          value={changePitching.serialNum}
          onChange={(e) =>
            setChangePitching({
              ...changePitching,
              serialNum: e.target.value,
            })
          }
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
      <Form.Group as={Col} xs="8" controlId={"changePitcherName"}>
        <Form.Label>投手姓名</Form.Label>
        <Form.Control
          value={changePitching.name}
          onChange={(e) =>
            setChangePitching({
              ...changePitching,
              name: e.target.value,
            })
          }
          type="text"
          required
        />
        <Form.Control.Feedback type="invalid">
          請填寫更換投手姓名
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}

export default ChangePitcher;
