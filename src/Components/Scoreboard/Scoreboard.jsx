// import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import React from "react";
import "./Scoreboard.css";

function Scoreboard(props) {
  const { inning, homePitcher, homeBatters, awayPitcher, awayBatters } = props;
  const playerList = [];
  playerList.push(inning + "//");
  playerList.push(homePitcher[0].serialNum + "," + homePitcher[0].name + "/");
  playerList.push(awayPitcher[0].serialNum + "," + awayPitcher[0].name + "/");
  playerList.push(
    homeBatters.map((batter) => {
      return batter.serialNum + "," + batter.name + "/";
    })
  );
  playerList.push(
    awayBatters.map((batter) => {
      return batter.serialNum + "," + batter.name + "/";
    })
  );

  return <div>{playerList}</div>;
}

export default Scoreboard;
