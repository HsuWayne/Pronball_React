// import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React from "react";
import ScoreboardView from "./ScoreboardView/ScoreboardView";
import Player from "../PlayerListInput/Player";

function Scoreboard(props) {
  //測試用參數
  const inning = "3";
  const homePitcher = [new Player("04", "趙小四")];
  const homeBatters = [
    new Player("01", "錢小一"),
    new Player("02", "孫小二"),
    new Player("03", "李小三"),
  ];
  const awayPitcher = [new Player("24", "周大四")];
  const awayBatters = [
    new Player("21", "吳大一"),
    new Player("22", "鄭大二"),
    new Player("23", "王大三"),
  ];
  //測試用參數

  //   const { inning, homePitcher, homeBatters, awayPitcher, awayBatters } = props;

  return (
    <>
      <ScoreboardView
        inning={inning}
        homePitcher={homePitcher}
        homeBatters={homeBatters}
        awayPitcher={awayPitcher}
        awayBatters={awayBatters}
      />
    </>
  );
}

export default Scoreboard;
