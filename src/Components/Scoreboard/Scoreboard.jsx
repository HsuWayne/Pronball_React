import { Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import "./Scoreboard.css";
import ScoreboardNav from "./ScoreboardComponents/ScoreboardNav";
import ScoreboardGameInfo from "./ScoreboardComponents/ScoreboardGameInfo";
import GamePlayArea from "./ScoreboardComponents/GamePlayArea";
import TeamInfoArea from "./ScoreboardComponents/TeamInfoArea";
import { useDispatch } from "react-redux";
import { setTest, setGameEnd } from "../../store/slice/gameDataSlice";
import { useSelector } from "react-redux";

function Scoreboard() {
  //測試用
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTest());
  }, [dispatch]);
  //測試用

  const gameData = useSelector((state) => state.gameData);
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

  return (
    <>
      {!gameData.gameEnd ? (
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
      ) : (
        <div>End</div>
      )}
    </>
  );
}

export default Scoreboard;
