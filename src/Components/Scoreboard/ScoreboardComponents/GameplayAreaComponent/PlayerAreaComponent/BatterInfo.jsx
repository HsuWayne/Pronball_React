import { Modal, Button, Table } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";

function BatterInfo(props) {
  const { batterShow, setBatterShow } = props;
  const gameData = useSelector((state) => state.gameData);
  const battingOrder = [...gameData.battingOrder].sort((a, b) => {
    return a.orderNumber - b.orderNumber;
  });

  return (
    <Modal
      show={batterShow}
      onHide={() => setBatterShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>打者資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
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
            {battingOrder.map((batter, index) => {
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setBatterShow(false)}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BatterInfo;
