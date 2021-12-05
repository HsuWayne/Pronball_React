import { Row, Col, Stack } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { strikeBall, ballBall } from "../../../../store/slice/ballsCountSlice";
import { useSelector } from "react-redux";

function GamePlayArea() {
  const dispatch = useDispatch();
  const ballsCount = useSelector((state) => state.ballsCount);
  const handleStrike = () => {
    dispatch(strikeBall());
  };
  const handleBall = () => {
    dispatch(ballBall());
  };
  const handleFoul = () => {
    if (ballsCount.strike === 2) {
      return;
    }
    dispatch(strikeBall());
  };
  return (
    <Col xs="9">
      <Row className="scoreboard_bat_area">
        <Col
          xs="4"
          className="scoreboard_bat_area_ball scoreboard_elements"
          onClick={handleBall}
        >
          壞球
        </Col>
        <Col
          xs="4"
          className="scoreboard_bat_area_strike scoreboard_elements"
          onClick={handleStrike}
        >
          好球
        </Col>
        <Col
          xs="4"
          className="scoreboard_bat_area_ball scoreboard_elements"
          onClick={handleBall}
        >
          壞球
        </Col>
      </Row>
      <Row className="scoreboard_foul_area scoreboard_elements">
        <Col xs="12" onClick={handleFoul}>
          界外
        </Col>
      </Row>
      <Row>
        <Col xs="6" className="scoreboard_ground_area scoreboard_elements">
          滾地出局區
          <br />
          (一壘雙殺，二三壘推進)
          <br />
          犧牲觸擊成功區
        </Col>
        <Col xs="6" className="scoreboard_ground_area scoreboard_elements">
          滾地出局區
          <br />
          (一壘雙殺，二三壘不動)
          <br />
          犧牲觸擊失敗區
        </Col>
      </Row>
      <Row>
        <Col xs="6" className="scoreboard_fly_area scoreboard_elements">
          直接一壘安打區
          <br />
          強力飛球區
          <br />
          (二三壘跑者推進)
        </Col>
        <Col xs="6" className="scoreboard_fly_area scoreboard_elements">
          直接一壘安打區
          <br />
          強力飛球區
          <br />
          (三壘跑者推進)
        </Col>
      </Row>
      <Row className="scoreboard_single_area scoreboard_elements">
        <Col xs="12">
          一壘安打區
          <br />
          (飛球落地)
        </Col>
      </Row>
      <Row>
        <Col xs="4" className="scoreboard_triple_area scoreboard_elements">
          三壘安打
        </Col>
        <Col xs="8" className="scoreboard_double_area scoreboard_elements">
          二壘安打區
        </Col>
      </Row>
      <Row className="scoreboard_homerun_area scoreboard_elements">
        <Col xs="12">全壘打</Col>
      </Row>
      <Stack className="pitcher scoreboard_elements align-items-center justify-content-center">
        投手
      </Stack>
      <Stack className="batter scoreboard_elements align-items-center justify-content-center">
        打者
      </Stack>
    </Col>
  );
}

export default GamePlayArea;
