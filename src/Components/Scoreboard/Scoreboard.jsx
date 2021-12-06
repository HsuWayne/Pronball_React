import { Container, Row } from "react-bootstrap";
import React from "react";
import "./Scoreboard.css";
import ScoreboardNav from "./ScoreboardComponents/ScoreboardNav";
import ScoreboardGameInfo from "./ScoreboardComponents/ScoreboardGameInfo";
import GamePlayArea from "./ScoreboardComponents/GamePlayArea";
import TeamInfoArea from "./ScoreboardComponents/TeamInfoArea";

function Scoreboard() {
  return (
    <div className="scoreboard">
      <Container>
        <ScoreboardNav />
        <ScoreboardGameInfo />
        <Row>
          <GamePlayArea />
          <TeamInfoArea />
        </Row>
      </Container>
    </div>
  );
}

export default Scoreboard;
