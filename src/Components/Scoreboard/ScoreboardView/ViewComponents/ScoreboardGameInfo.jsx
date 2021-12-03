import { Row, Col, Stack } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function ScoreboardGameInfo() {
  return (
    <Row>
      {/* 局數顯示 */}
      <Stack
        as={Col}
        xs="3"
        gap={1}
        direction="horizontal"
        className="align-items-center justify-content-center scoreboard_inningCount"
      >
        <div>1</div>
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretDown} />
      </Stack>
      {/* 出局數顯示 */}
      <Stack
        as={Col}
        xs="3"
        direction="horizontal"
        gap={2}
        className="align-items-center justify-content-center scoreboard_outCount"
      >
        <div>OUT:</div>
        <div className="scoreboard_outOn"></div>
        <div className="scoreboard_outOn"></div>
      </Stack>
      {/* 好壞球顯示 */}
      <Col xs={{ span: 4, offset: 2 }}>
        <Row className="align-items-center scoreboard_ballCount">
          <Col xs="3" className="text-center">
            S:
          </Col>
          <Col xs="3">
            <div className="scoreboard_ballStrike"></div>
          </Col>
          <Col xs="3">
            <div className="scoreboard_ballStrike"></div>
          </Col>
        </Row>
        <Row className="align-items-center scoreboard_ballCount">
          <Col xs="3" className="text-center">
            B:
          </Col>
          <Col xs="3">
            <div className="scoreboard_ballBall"></div>
          </Col>
          <Col xs="3">
            <div className="scoreboard_ballBall"></div>
          </Col>
          <Col xs="3">
            <div className="scoreboard_ballBall"></div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
