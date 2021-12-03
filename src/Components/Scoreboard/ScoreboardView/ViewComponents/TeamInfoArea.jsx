import { Row, Col, Stack } from "react-bootstrap";
import React from "react";

export default function TeamInfoArea(props) {
  const { homePitcher, homeBatters, awayPitcher, awayBatters } = props;

  return (
    <Col xs="3">
      <Row className="scoreboard_court">
        <Stack className="justify-content-center align-items-center">
          <div className="court">
            <div className="base base_1">
              <p>1</p>
            </div>
            <div className="base base_2">
              <p>2</p>
            </div>
            <div className="base base_3">
              <p>3</p>
            </div>
            <div className="base base_4">
              <p>4</p>
            </div>
          </div>
        </Stack>
      </Row>
      <Row className="bg-home">
        <div className="scoreboard_teamsInfo_pitcher text-nowrap">
          {"(" + homePitcher[0].serialNum + ")" + homePitcher[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          {homeBatters.map((batter, index) => {
            return (
              <div key={"homeBatter" + index}>
                {"(" + batter.serialNum + ")" + batter.name}
              </div>
            );
          })}
        </div>
      </Row>
      <Row className="bg-away">
        <div className="scoreboard_teamsInfo_pitcher text-nowrap">
          {"(" + awayPitcher[0].serialNum + ")" + awayPitcher[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          {awayBatters.map((batter, index) => {
            return (
              <div key={"awayBatter" + index}>
                {"(" + batter.serialNum + ")" + batter.name}
              </div>
            );
          })}
        </div>
      </Row>
    </Col>
  );
}
