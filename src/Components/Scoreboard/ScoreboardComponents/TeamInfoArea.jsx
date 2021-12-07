import React from "react";
import { Row, Col, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function TeamInfoArea() {
  const gameData = useSelector((state) => state.gameData);

  return (
    <Col xs="3">
      <Row className="scoreboard_court">
        <Stack className="justify-content-center align-items-center">
          <div className="court">
            {gameData.runnerBase.map((element, index) => {
              return (
                <div className={"base base_" + element} key={"base" + element}>
                  <p>{gameData.runner[index][0].serialNum}</p>
                </div>
              );
            })}
            <div className="base base_4">
              <p>{gameData.batting[0].serialNum}</p>
            </div>
          </div>
        </Stack>
      </Row>
      <Row className="bg-home">
        <div className="scoreboard_teamsInfo_pitcher text-nowrap">
          {"(" +
            gameData.homePitchers[0].serialNum +
            ")" +
            gameData.homePitchers[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          <div>
            {"Next "}
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {gameData.homeBatters.map((batter, index) => {
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
            gameData.awayPitchers[0].serialNum +
            ")" +
            gameData.awayPitchers[0].name}
        </div>
        <div className="scoreboard_teamsInfo_batter text-nowrap">
          <div>
            {"Next "}
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {gameData.awayBatters.map((batter, index) => {
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
