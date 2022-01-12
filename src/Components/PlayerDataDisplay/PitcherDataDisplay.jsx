import React, { useState, useEffect } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { Container, Table } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import playersFromDB from "../../firebase";

function PitcherDataDisplay() {
  const [playerList, setPlayerList] = useState();

  useEffect(() => {
    const playerListFromDB = [];
    async function gettingFirebasePlayer() {
      await getDocs(query(playersFromDB, orderBy("serialNumber"))).then(
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
            <div style={{ overflow: "auto" }}>
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
            </div>
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
