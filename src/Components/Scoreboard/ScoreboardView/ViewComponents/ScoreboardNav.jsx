import { Row, Col } from "react-bootstrap";
import React from "react";

export default function ScoreboardNav() {
  return (
    <>
      <Row className="scoreboard_nav">
        <Col xs="4" className="bg-home text-center">
          主：0
        </Col>
        <Col xs="8" className="bg-secondary bg-opacity-50 status text-nowrap">
          投手資訊
        </Col>
      </Row>
      <Row className="scoreboard_nav">
        <Col xs="4" className="bg-away text-center">
          客：0
        </Col>
        <Col xs="8" className="bg-secondary bg-opacity-25 status text-nowrap">
          打者資訊
        </Col>
      </Row>
    </>
  );
}
