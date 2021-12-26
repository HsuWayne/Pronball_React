import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Alert } from "react-bootstrap";

function PlayerListFromDB(props) {
  const { playerListFromDBShow, setPlayerListFromDBShow } = props;

  const gameData = useSelector((state) => state.gameData);

  return (
    <Modal
      show={playerListFromDBShow}
      onHide={() => setPlayerListFromDBShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>已註冊球員名單</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gameData.playerListFromDB.length === 0 ? (
          <Alert variant="danger" className="text-center">
            載入球員名單失敗
          </Alert>
        ) : (
          <Table striped bordered>
            <thead>
              <tr>
                <th>背號</th>
                <th>姓名</th>
              </tr>
            </thead>
            <tbody>
              {gameData.playerListFromDB.map((player, index) => {
                return (
                  <tr key={"player" + index}>
                    <td>{player.serialNum}</td>
                    <td>{player.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setPlayerListFromDBShow(false)}
        >
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerListFromDB;
