import { Col } from "react-bootstrap";
import React from "react";
import BallsCountArea from "./GameplayAreaComponent/BallsCountArea";
import InplayArea from "./GameplayAreaComponent/InplayArea";
import PlayerArea from "./GameplayAreaComponent/PlayerArea";

export default function GamePlayArea() {
  return (
    <Col xs="9">
      <BallsCountArea />
      <InplayArea />
      <PlayerArea />
    </Col>
  );
}
