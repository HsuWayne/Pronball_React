import { Row, Col, Stack } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";

export default function TeamInfoArea(props) {
  const playerList = useSelector((state) => state.playerList);

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
          {"(" +
            playerList.homePitchers[0].serialNum +
            ")" +
            playerList.homePitchers[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          {playerList.homeBatters.map((batter, index) => {
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
          {"(" +
            playerList.awayPitchers[0].serialNum +
            ")" +
            playerList.awayPitchers[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          {playerList.awayBatters.map((batter, index) => {
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
