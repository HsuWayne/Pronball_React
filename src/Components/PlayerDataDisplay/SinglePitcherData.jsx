import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";

const firebaseConfig = {
  apiKey: "AIzaSyCh6fWlLO_5BBg6KYIhOpQm-NYYxGThxT8",
  authDomain: "pronball-51cf0.firebaseapp.com",
  projectId: "pronball-51cf0",
  storageBucket: "pronball-51cf0.appspot.com",
  messagingSenderId: "962660474419",
  appId: "1:962660474419:web:9c454bcaf770cabca0cd46",
  measurementId: "G-DRK81DGZ5G",
};

function SinglePitcherData() {
  const [singlePitcher, setSinglePitcher] = useState();
  let params = useParams();
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "Players", params.pitcherId);
    const pitcher = [];
    async function gettingPitcher() {
      await getDoc(docRef).then((player) => {
        pitcher.push({
          name: player.id,
          serialNum: player.data().serialNumber,
          pitcher: player.data().pitcher,
        });
      });
      setSinglePitcher(pitcher);
    }
    gettingPitcher();
  }, [params.pitcherId]);
  return (
    <>
      <h5 className="mt-3">{params.pitcherId}</h5>
      {singlePitcher ? (
        <Table striped bordered className="mt-3">
          <thead>
            <tr>
              <th>背號</th>
              <th>姓名</th>
              <th>Game</th>
              <th>IP</th>
              <th>H</th>
              <th>HR</th>
              <th>ER</th>
              <th>IRA</th>
              <th>K</th>
              <th>BB</th>
              <th>PC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{singlePitcher[0].serialNum}</td>
              <td>{singlePitcher[0].name}</td>
              <td>{singlePitcher[0].pitcher.gamePlayed}</td>
              <td>
                {parseInt(singlePitcher[0].pitcher.o / 3) +
                  (singlePitcher[0].pitcher.o % 3) / 10}
              </td>
              <td>{singlePitcher[0].pitcher.h}</td>
              <td>{singlePitcher[0].pitcher.hr}</td>
              <td>{singlePitcher[0].pitcher.er}</td>
              <td>{singlePitcher[0].pitcher.ira}</td>
              <td>{singlePitcher[0].pitcher.k}</td>
              <td>{singlePitcher[0].pitcher.bbPit}</td>
              <td>
                {singlePitcher[0].pitcher.strike +
                  singlePitcher[0].pitcher.ball +
                  "(" +
                  singlePitcher[0].pitcher.strike +
                  ":" +
                  singlePitcher[0].pitcher.ball +
                  ")"}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default SinglePitcherData;
