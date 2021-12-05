// import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React from "react";
import ScoreboardView from "./ScoreboardView/ScoreboardView";

function Scoreboard(props) {
  //測試用參數
  const inning = "3";
  const homePitcher = [("04", "趙小四")];
  const homeBatters = [("01", "錢小一"), ("02", "孫小二"), ("03", "李小三")];
  const awayPitcher = [("24", "周大四")];
  const awayBatters = [("21", "吳大一"), ("22", "鄭大二"), ("23", "王大三")];
  //測試用參數

  //   const inning = props.inning;

  return (
    <>
      <ScoreboardView inning={inning} />
    </>
  );
}

export default Scoreboard;
