import { Container, Form, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./PlayerListInput.css";
import InputPlayer from "./InputPlayer/InputPlayer";

function InputForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} xs="6" controlId="Inning select">
          <Form.Label>比賽局數</Form.Label>
          <Form.Select defaultValue={9} aria-label="Inning select">
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
      <InputPlayer team="home" />
      <hr />
      <InputPlayer team="away" />
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

const PlayerListInput = () => {
  return (
    <div className="scoreboard_form">
      <Container>
        <div className="form_title">比賽及選手資訊登錄</div>
        <InputForm />
      </Container>
    </div>
  );
};

export default PlayerListInput;
