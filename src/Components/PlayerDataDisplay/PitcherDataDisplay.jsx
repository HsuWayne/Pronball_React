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

function PitcherDataDisplay() {
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
              pitcher: player.data().pitcher,
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
        <h4 className="mt-5">投手數據</h4>
        {playerList ? (
          <>
            <Table striped bordered className="mt-3">
              <thead>
                <tr>
                  <th>背號</th>
                  <th>姓名</th>
                  <th>ERA</th>
                  <th>K/BB</th>
                  <th>WHIP</th>
                  <th>OBA</th>
                  <th>BAA</th>
                  <th>K/9</th>
                  <th>H/9</th>
                  <th>BB/9</th>
                  <th>Strike%</th>
                </tr>
              </thead>
              <tbody>
                {playerList.map((pitcher, index) => {
                  return (
                    <tr key={"pitcher" + index}>
                      <td>{pitcher.serialNum}</td>
                      <td>
                        <Link to={`/Pronball_React/pitcher/${pitcher.name}`}>
                          {pitcher.name}
                        </Link>
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.er /
                            (parseInt(pitcher.pitcher.o / 3) +
                              (pitcher.pitcher.o % 3) / 10)) *
                            9 *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.k / pitcher.pitcher.bbPit) * 100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          ((pitcher.pitcher.h + pitcher.pitcher.bbPit) /
                            (parseInt(pitcher.pitcher.o / 3) +
                              (pitcher.pitcher.o % 3) / 10)) *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          ((pitcher.pitcher.h + pitcher.pitcher.bbPit) /
                            (pitcher.pitcher.o +
                              pitcher.pitcher.h +
                              pitcher.pitcher.bbPit)) *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.h /
                            (pitcher.pitcher.o +
                              pitcher.pitcher.h +
                              pitcher.pitcher.bbPit)) *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.k /
                            (parseInt(pitcher.pitcher.o / 3) +
                              (pitcher.pitcher.o % 3) / 10)) *
                            9 *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.h /
                            (parseInt(pitcher.pitcher.o / 3) +
                              (pitcher.pitcher.o % 3) / 10)) *
                            9 *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {Math.round(
                          (pitcher.pitcher.bbPit /
                            (parseInt(pitcher.pitcher.o / 3) +
                              (pitcher.pitcher.o % 3) / 10)) *
                            9 *
                            100
                        ) / 100 || 0}
                      </td>
                      <td>
                        {pitcher.pitcher.strike
                          ? Math.round(
                              (pitcher.pitcher.strike /
                                (pitcher.pitcher.strike +
                                  pitcher.pitcher.ball)) *
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

export default PitcherDataDisplay;
