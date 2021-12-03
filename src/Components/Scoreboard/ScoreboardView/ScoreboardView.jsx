import { Container, Row } from "react-bootstrap";
import React from "react";
import "./ScoreboardView.css";
import ScoreboardNav from "./ViewComponents/ScoreboardNav";
import ScoreboardGameInfo from "./ViewComponents/ScoreboardGameInfo";
import GamePlayArea from "./ViewComponents/GamePlayArea";
import TeamInfoArea from "./ViewComponents/TeamInfoArea";

function ScoreboardView(props) {
  const { inning, homePitcher, homeBatters, awayPitcher, awayBatters } = props;

  return (
    <div className="scoreboard">
      <Container>
        <ScoreboardNav />
        <ScoreboardGameInfo />
        <Row>
          <GamePlayArea />
          <TeamInfoArea
            homePitcher={homePitcher}
            homeBatters={homeBatters}
            awayPitcher={awayPitcher}
            awayBatters={awayBatters}
          />
        </Row>
      </Container>
    </div>
  );
}

export default ScoreboardView;
