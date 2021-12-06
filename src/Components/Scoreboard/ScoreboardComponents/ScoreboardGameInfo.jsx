import { Row, Col, Stack } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function ScoreboardGameInfo() {
  const gameData = useSelector((state) => state.gameData);
  const strikeCount = [];
  for (let i = 0; i < gameData.strike; i++) {
    strikeCount.push(
      <Col xs="3" key={"strike" + i}>
        <div className="scoreboard_ballStrike"></div>
      </Col>
    );
  }
  const ballCount = [];
  for (let i = 0; i < gameData.ball; i++) {
    ballCount.push(
      <Col xs="3" key={"ball" + i}>
        <div className="scoreboard_ballBall"></div>
      </Col>
    );
  }
  const outCount = [];
  for (let i = 0; i < gameData.out; i++) {
    outCount.push(<div className="scoreboard_outOn" key={"out" + i}></div>);
  }
  const topInning = true;

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
        <div>{gameData.gameInning}</div>
        {topInning ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </Stack>
      {/* 出局數顯示 */}
      <Stack
        as={Col}
        xs="3"
        direction="horizontal"
        gap={2}
        className="align-items-center justify-content-start scoreboard_outCount"
      >
        <div>OUT:</div>
        {outCount}
      </Stack>
      {/* 好壞球顯示 */}
      <Col xs={{ span: 4, offset: 2 }}>
        <Row className="align-items-center scoreboard_ballCount">
          <Col xs="3" className="text-center">
            S:
          </Col>
          {strikeCount}
        </Row>
        <Row className="align-items-center scoreboard_ballCount">
          <Col xs="3" className="text-center">
            B:
          </Col>
          {ballCount}
        </Row>
      </Col>
    </Row>
  );
}

export default ScoreboardGameInfo;
