import { Modal, Button, Table } from "react-bootstrap";
import React from "react";

function FirebasePlayerList(props) {
  const {
    firebasePlayerList,
    firebasePlayerListShow,
    setFirebasePlayerListShow,
  } = props;

  return (
    <Modal
      show={firebasePlayerListShow}
      onHide={() => setFirebasePlayerListShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>已註冊球員名單</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <thead>
            <tr>
              <th>背號</th>
              <th>姓名</th>
            </tr>
          </thead>
          <tbody>
            {firebasePlayerList.map((player, index) => {
              return (
                <tr key={"player" + index}>
                  <td>{player.serialNum}</td>
                  <td>{player.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setFirebasePlayerListShow(false)}
        >
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FirebasePlayerList;
