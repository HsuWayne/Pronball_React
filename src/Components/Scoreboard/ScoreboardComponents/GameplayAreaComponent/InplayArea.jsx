import { Row, Col } from "react-bootstrap";
import React from "react";
// import { useDispatch } from "react-redux";

function InplayArea() {
  // const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
}

export default InplayArea;
