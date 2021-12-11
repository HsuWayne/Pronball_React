import { Row, Col } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";

export default function ScoreboardNav() {
  const gameData = useSelector((state) => state.gameData);

  return (
    <>
      <Row className="scoreboard_nav">
        <Col xs="4" className="bg-home text-center">
          主：{gameData.homePoint}
        </Col>
        <Col xs="8" className="bg-secondary bg-opacity-50 status text-nowrap">
          {"投手：" +
            gameData.pitching[0].name +
            " 球數：" +
            (gameData.pitching[0].strike + gameData.pitching[0].ball) +
            " (好" +
            gameData.pitching[0].strike +
            "：壞" +
            gameData.pitching[0].ball +
            ")"}
        </Col>
      </Row>
      <Row className="scoreboard_nav">
        <Col xs="4" className="bg-away text-center">
          客：{gameData.awayPoint}
        </Col>
        <Col xs="8" className="bg-secondary bg-opacity-25 status text-nowrap">
          {"打者：" +
            gameData.batting[0].name +
            " AB:" +
            (gameData.batting[0].single +
              gameData.batting[0].double +
              gameData.batting[0].triple +
              gameData.batting[0].homerun +
              gameData.batting[0].so +
              gameData.batting[0].go +
              gameData.batting[0].ao) +
            " ,H:" +
            (gameData.batting[0].single +
              gameData.batting[0].double +
              gameData.batting[0].triple +
              gameData.batting[0].homerun) +
            " ,BB:" +
            gameData.batting[0].bb +
            " ,SO:" +
            gameData.batting[0].so}
        </Col>
      </Row>
    </>
  );
}
