import { Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./Scoreboard.css";
import ScoreboardNav from "./ScoreboardComponents/ScoreboardNav";
import ScoreboardGameInfo from "./ScoreboardComponents/ScoreboardGameInfo";
import GamePlayArea from "./ScoreboardComponents/GamePlayArea";
import TeamInfoArea from "./ScoreboardComponents/TeamInfoArea";
import GameResult from "./ScoreboardComponents/GameResult";
import { useDispatch } from "react-redux";
import { setGameEnd } from "../../store/slice/gameDataSlice";
import { useSelector } from "react-redux";

function Scoreboard() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const [showGameResult, setShowGameResult] = useState(false);
  useEffect(() => {
    if (gameData.lastHalfCheck) {
      if (gameData.homePoint > gameData.awayPoint) {
        dispatch(setGameEnd());
      }
    }
  }, [
    gameData.lastHalfCheck,
    gameData.homePoint,
    gameData.awayPoint,
    dispatch,
  ]);

  useEffect(() => {
    if (gameData.gameEnd) {
      setShowGameResult(true);
    }
  }, [gameData.gameEnd]);

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
      <GameResult
        showGameResult={showGameResult}
        setShowGameResult={setShowGameResult}
      />
    </div>
  );
}

export default Scoreboard;
