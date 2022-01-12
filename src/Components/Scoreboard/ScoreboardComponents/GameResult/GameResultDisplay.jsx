import React from "react";
import { Modal, Button, Table, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function GameResultDisplay(props) {
  const gameData = useSelector((state) => state.gameData);
  const { showGameResult, setShowGameResult, handleGameResultUpdate } = props;
  const totalInning = [];
  for (let i = 1; i <= gameData.gameInning; i++) {
    totalInning.push(<th key={"inning" + i}>{i}</th>);
  }
  //客隊分數＆安打
  const awayResult = [];
  gameData.awayPointList.forEach(function (element, index) {
    awayResult.push(<td key={"away" + index}>{element}</td>);
  });
  awayResult.push(<td key="awayPoint">{gameData.awayPoint}</td>);
  let awayHitsTotal = 0;
  gameData.awayBatters.forEach(function (element) {
    awayHitsTotal +=
      element.single + element.double + element.triple + element.homerun;
  });
  awayResult.push(<td key="awayHits">{awayHitsTotal}</td>);
  //主隊分數＆安打
  const homeResult = [];
  gameData.homePointList.forEach(function (element, index) {
    homeResult.push(<td key={"home" + index}>{element}</td>);
  });
  homeResult.push(<td key="homePoint">{gameData.homePoint}</td>);
  let homeHitsTotal = 0;
  gameData.homeBatters.forEach(function (element) {
    homeHitsTotal +=
      element.single + element.double + element.triple + element.homerun;
  });
  homeResult.push(<td key="homeHits">{homeHitsTotal}</td>);
  //主隊投打名單
  const homePitchers = [...gameData.homePitchers].reverse();
  const homeBatters = [...gameData.homeBatters].sort((a, b) => {
    return a.orderNumber - b.orderNumber;
  });
  //客隊投打名單
  const awayPitchers = [...gameData.awayPitchers].reverse();
  const awayBatters = [...gameData.awayBatters].sort((a, b) => {
    return a.orderNumber - b.orderNumber;
  });

  return (
    <Modal
      show={showGameResult}
      onHide={() => setShowGameResult(false)}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      className="gameResult"
    >
      <Modal.Header>
        <Modal.Title>
          比賽結束！最終比數 主 {gameData.homePoint}：客 {gameData.awayPoint}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="scoreboard_result">
        <Table striped bordered className="caption-top">
          <caption>比賽結果</caption>
          <thead>
            <tr>
              <th>#</th>
              {totalInning}
              <th className="table-active">R</th>
              <th className="table-active">H</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>AWAY</th>
              {awayResult}
            </tr>
            <tr>
              <th>HOME</th>
              {homeResult}
            </tr>
          </tbody>
        </Table>
        <Tab.Container id="left-tabs-example" defaultActiveKey="home">
          <Nav variant="pills" className="mt-3">
            <Nav.Item>
              <Nav.Link eventKey="home" className="result_title">
                主隊成績
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="away" className="result_title">
                客隊成績
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="home">
              <Table striped bordered className="mt-3 caption-top">
                <caption>投手</caption>
                <thead>
                  <tr>
                    <th>背號</th>
                    <th>姓名</th>
                    <th>IP</th>
                    <th>H</th>
                    <th>HR</th>
                    <th>ER</th>
                    <th>BB</th>
                    <th>SO</th>
                    <th>球數</th>
                  </tr>
                </thead>
                <tbody>
                  {homePitchers.map((pitcher, index) => {
                    return (
                      <tr key={"pitcher" + index}>
                        <td>{pitcher.serialNum}</td>
                        <td>{pitcher.name}</td>
                        <td>
                          {parseInt(pitcher.o / 3) + (pitcher.o % 3) / 10}
                        </td>
                        <td>{pitcher.h}</td>
                        <td>{pitcher.hr}</td>
                        <td>{pitcher.er}</td>
                        <td>{pitcher.bbPit}</td>
                        <td>{pitcher.k}</td>
                        <td>
                          {pitcher.strike +
                            pitcher.ball +
                            "(" +
                            pitcher.strike +
                            ":" +
                            pitcher.ball +
                            ")"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table striped bordered className="caption-top">
                <caption>打者</caption>
                <thead>
                  <tr>
                    <th>背號</th>
                    <th>姓名</th>
                    <th>AB</th>
                    <th>R</th>
                    <th>H</th>
                    <th>HR</th>
                    <th>RBI</th>
                    <th>BB</th>
                    <th>SO</th>
                  </tr>
                </thead>
                <tbody>
                  {homeBatters.map((batter, index) => {
                    return (
                      <tr key={"batter" + index}>
                        <td>{batter.serialNum}</td>
                        <td>{batter.name}</td>
                        <td>
                          {batter.single +
                            batter.double +
                            batter.triple +
                            batter.homerun +
                            batter.so +
                            batter.go +
                            batter.ao}
                        </td>
                        <td>{batter.runs}</td>
                        <td>
                          {batter.single +
                            batter.double +
                            batter.triple +
                            batter.homerun}
                        </td>
                        <td>{batter.homerun}</td>
                        <td>{batter.rbi}</td>
                        <td>{batter.bb}</td>
                        <td>{batter.so}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="away">
              <Table striped bordered className="mt-3 caption-top">
                <caption>投手</caption>
                <thead>
                  <tr>
                    <th>背號</th>
                    <th>姓名</th>
                    <th>IP</th>
                    <th>H</th>
                    <th>HR</th>
                    <th>ER</th>
                    <th>BB</th>
                    <th>SO</th>
                    <th>球數</th>
                  </tr>
                </thead>
                <tbody>
                  {awayPitchers.map((pitcher, index) => {
                    return (
                      <tr key={"pitcher" + index}>
                        <td>{pitcher.serialNum}</td>
                        <td>{pitcher.name}</td>
                        <td>
                          {parseInt(pitcher.o / 3) + (pitcher.o % 3) / 10}
                        </td>
                        <td>{pitcher.h}</td>
                        <td>{pitcher.hr}</td>
                        <td>{pitcher.er}</td>
                        <td>{pitcher.bbPit}</td>
                        <td>{pitcher.k}</td>
                        <td>
                          {pitcher.strike +
                            pitcher.ball +
                            "(" +
                            pitcher.strike +
                            ":" +
                            pitcher.ball +
                            ")"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table striped bordered className="caption-top">
                <caption>打者</caption>
                <thead>
                  <tr>
                    <th>背號</th>
                    <th>姓名</th>
                    <th>AB</th>
                    <th>R</th>
                    <th>H</th>
                    <th>HR</th>
                    <th>RBI</th>
                    <th>BB</th>
                    <th>SO</th>
                  </tr>
                </thead>
                <tbody>
                  {awayBatters.map((batter, index) => {
                    return (
                      <tr key={"batter" + index}>
                        <td>{batter.serialNum}</td>
                        <td>{batter.name}</td>
                        <td>
                          {batter.single +
                            batter.double +
                            batter.triple +
                            batter.homerun +
                            batter.so +
                            batter.go +
                            batter.ao}
                        </td>
                        <td>{batter.runs}</td>
                        <td>
                          {batter.single +
                            batter.double +
                            batter.triple +
                            batter.homerun}
                        </td>
                        <td>{batter.homerun}</td>
                        <td>{batter.rbi}</td>
                        <td>{batter.bb}</td>
                        <td>{batter.so}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          as={Link}
          to="/Pronball_React/"
          variant="primary"
          onClick={() => {
            handleGameResultUpdate();
          }}
        >
          結束並退出
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GameResultDisplay;
