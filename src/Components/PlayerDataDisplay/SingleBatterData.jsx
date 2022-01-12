import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import { db } from "../../firebase";

function SingleBatterData() {
  const [singleBatter, setSingleBatter] = useState();
  let params = useParams();
  useEffect(() => {
    const docRef = doc(db, "Players", params.batterId);
    const batter = [];
    async function gettingBatter() {
      await getDoc(docRef)
        .then((player) => {
          batter.push({
            name: player.id,
            serialNum: player.data().serialNumber,
            batter: player.data().batter,
          });
        })
        .catch(() =>
          batter.push({
            name: "查無此球員",
            serialNum: "",
            batter: {},
          })
        );
      setSingleBatter(batter);
    }
    gettingBatter();
  }, [params.batterId]);
  return (
    <>
      <h5 className="mt-3">{params.batterId}</h5>
      {singleBatter ? (
        <Table striped bordered className="mt-3">
          <thead>
            <tr>
              <th>背號</th>
              <th>姓名</th>
              <th>Game</th>
              <th>PA</th>
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
            <tr>
              <td>{singleBatter[0].serialNum}</td>
              <td>{singleBatter[0].name}</td>
              <td>{singleBatter[0].batter.gamePlayed}</td>
              <td>
                {singleBatter[0].batter.single +
                  singleBatter[0].batter.double +
                  singleBatter[0].batter.triple +
                  singleBatter[0].batter.homerun +
                  singleBatter[0].batter.so +
                  singleBatter[0].batter.go +
                  singleBatter[0].batter.ao +
                  singleBatter[0].batter.bb +
                  singleBatter[0].batter.sf +
                  singleBatter[0].batter.sh || ""}
              </td>
              <td>
                {singleBatter[0].batter.single +
                  singleBatter[0].batter.double +
                  singleBatter[0].batter.triple +
                  singleBatter[0].batter.homerun +
                  singleBatter[0].batter.so +
                  singleBatter[0].batter.go +
                  singleBatter[0].batter.ao || ""}
              </td>
              <td>{singleBatter[0].batter.runs}</td>
              <td>
                {singleBatter[0].batter.single +
                  singleBatter[0].batter.double +
                  singleBatter[0].batter.triple +
                  singleBatter[0].batter.homerun || ""}
              </td>
              <td>{singleBatter[0].batter.homerun}</td>
              <td>{singleBatter[0].batter.rbi}</td>
              <td>{singleBatter[0].batter.bb}</td>
              <td>{singleBatter[0].batter.so}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default SingleBatterData;
