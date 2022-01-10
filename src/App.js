import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";
import Scoreboard from "./Components/Scoreboard/Scoreboard";
import PitcherDataDisplay from "./Components/PlayerDataDisplay/PitcherDataDisplay";
import SinglePitcherData from "./Components/PlayerDataDisplay/SinglePitcherData";
import BatterDataDisplay from "./Components/PlayerDataDisplay/BatterDataDisplay";
import SingleBatterData from "./Components/PlayerDataDisplay/SingleBatterData";

export default function App() {
  const [playerListSubmitted, setPlayerListSubmitted] = useState(false);

  return (
    <>
      <WebNavbar />
      <Routes>
        <Route
          path="/"
          element={
            !playerListSubmitted ? (
              <PlayerListInput
                setPlayerListSubmitted={setPlayerListSubmitted}
              />
            ) : (
              <Scoreboard />
            )
          }
        />
        <Route path="pitcher" element={<PitcherDataDisplay />}>
          <Route path=":pitcherId" element={<SinglePitcherData />} />
        </Route>
        <Route path="batter" element={<BatterDataDisplay />}>
          <Route path=":batterId" element={<SingleBatterData />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}
