import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";
import Scoreboard from "./Components/Scoreboard/Scoreboard";
import PitcherDataDisplay from "./Components/PlayerDataDisplay/PitcherDataDisplay";
import BatterDataDisplay from "./Components/PlayerDataDisplay/BatterDataDisplay";

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
        <Route path="pitcher" element={<PitcherDataDisplay />} />
        <Route path="batter" element={<BatterDataDisplay />} />
      </Routes>
    </>
  );
}
