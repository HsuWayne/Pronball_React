import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Container, Table } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCh6fWlLO_5BBg6KYIhOpQm-NYYxGThxT8",
  authDomain: "pronball-51cf0.firebaseapp.com",
  projectId: "pronball-51cf0",
  storageBucket: "pronball-51cf0.appspot.com",
  messagingSenderId: "962660474419",
  appId: "1:962660474419:web:9c454bcaf770cabca0cd46",
  measurementId: "G-DRK81DGZ5G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const players = collection(db, "Players");

function BatterDataDisplay() {
  const [playerList, setPlayerList] = useState();

  useEffect(() => {
    const playerListFromDB = [];
    async function gettingFirebasePlayer() {
      await getDocs(query(players, orderBy("serialNumber"))).then(
        (queryPlayer) => {
          queryPlayer.forEach((player) => {
            playerListFromDB.push({
              name: player.id,
              serialNum: player.data().serialNumber,
              batter: player.data().batter,
            });
          });
        }
      );
      setPlayerList(playerListFromDB);
    }
    gettingFirebasePlayer();
  }, []);

  return (
    <>
      <Container>
        <h4 className="mt-5">打者數據</h4>
        {playerList ? (
          <>
            <Table striped bordered className="mt-3">
              <thead>
                {/* // AVG OBP SLG OPS GO/AO HR% */}
                <tr>
                  <th>背號</th>
                  <th>姓名</th>
                  <th>AVG</th>
                  <th>OBP</th>
                  <th>SLG</th>
                  <th>OPS</th>
                  <th>GO/AO</th>
                  <th>HR%</th>
                  <th>BB%</th>
                </tr>
              </thead>
              <tbody>
                {playerList.map((batter, index) => {
                  return (
                    <tr key={"batter" + index}>
                      <td>{batter.serialNum}</td>
                      <td>
                        <Link to={`/batter/${batter.name}`}>{batter.name}</Link>
                      </td>
                      <td>
                        {Math.round(
                          ((batter.batter.single +
                            batter.batter.double +
                            batter.batter.triple +
                            batter.batter.homerun) /
                            (batter.batter.single +
                              batter.batter.double +
                              batter.batter.triple +
                              batter.batter.homerun +
                              batter.batter.so +
                              batter.batter.go +
                              batter.batter.ao)) *
                            1000
                        ) / 1000 || 0}
                      </td>
                      <td>
                        {Math.round(
                          ((batter.batter.single +
                            batter.batter.double +
                            batter.batter.triple +
                            batter.batter.homerun +
                            batter.batter.bb) /
                            (batter.batter.single +
                              batter.batter.double +
                              batter.batter.triple +
                              batter.batter.homerun +
                              batter.batter.so +
                              batter.batter.go +
                              batter.batter.ao +
                              batter.batter.bb +
                              batter.batter.sf)) *
                            1000
                        ) / 1000 || 0}
                      </td>
                      <td>
                        {Math.round(
                          ((batter.batter.single +
                            batter.batter.double * 2 +
                            batter.batter.triple * 3 +
                            batter.batter.homerun * 4) /
                            (batter.batter.single +
                              batter.batter.double +
                              batter.batter.triple +
                              batter.batter.homerun +
                              batter.batter.so +
                              batter.batter.go +
                              batter.batter.ao)) *
                            1000
                        ) / 1000 || 0}
                      </td>
                      <td>
                        {Math.round(
                          ((batter.batter.single +
                            batter.batter.double +
                            batter.batter.triple +
                            batter.batter.homerun +
                            batter.batter.bb) /
                            (batter.batter.single +
                              batter.batter.double +
                              batter.batter.triple +
                              batter.batter.homerun +
                              batter.batter.so +
                              batter.batter.go +
                              batter.batter.ao +
                              batter.batter.bb +
                              batter.batter.sf) +
                            (batter.batter.single +
                              batter.batter.double * 2 +
                              batter.batter.triple * 3 +
                              batter.batter.homerun * 4) /
                              (batter.batter.single +
                                batter.batter.double +
                                batter.batter.triple +
                                batter.batter.homerun +
                                batter.batter.so +
                                batter.batter.go +
                                batter.batter.ao)) *
                            1000
                        ) / 1000 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (batter.batter.go / batter.batter.ao) * 100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {batter.batter.homerun
                          ? Math.round(
                              (batter.batter.homerun /
                                (batter.batter.single +
                                  batter.batter.double +
                                  batter.batter.triple +
                                  batter.batter.homerun +
                                  batter.batter.so +
                                  batter.batter.go +
                                  batter.batter.ao)) *
                                100
                            ) + "%"
                          : 0 + "%"}
                      </td>
                      <td>
                        {batter.batter.bb
                          ? Math.round(
                              (batter.batter.bb /
                                (batter.batter.single +
                                  batter.batter.double +
                                  batter.batter.triple +
                                  batter.batter.homerun +
                                  batter.batter.so +
                                  batter.batter.go +
                                  batter.batter.ao)) *
                                100
                            ) + "%"
                          : 0 + "%"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Outlet />
          </>
        ) : (
          "loading..."
        )}
      </Container>
    </>
  );
}

export default BatterDataDisplay;
