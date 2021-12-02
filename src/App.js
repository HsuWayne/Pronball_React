import React, { useState } from "react";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";
import Scoreboard from "./Components/Scoreboard/Scoreboard";

function App() {
  const [playerListSubmitted, setPlayerListSubmitted] = useState(false);
  const [inning, setInning] = useState("9");
  const [homePitcher, setHomePitcher] = useState([]);
  const [homeBatters, setHomeBatters] = useState([]);
  const [awayPitcher, setAwayPitcher] = useState([]);
  const [awayBatters, setAwayBatters] = useState([]);

  return (
    <>
      <WebNavbar />
      {!playerListSubmitted ? (
        <PlayerListInput
          setPlayerListSubmitted={setPlayerListSubmitted}
          inning={inning}
          setInning={setInning}
          setHomePitcher={setHomePitcher}
          setHomeBatters={setHomeBatters}
          setAwayPitcher={setAwayPitcher}
          setAwayBatters={setAwayBatters}
        />
      ) : (
        <Scoreboard
          inning={inning}
          homePitcher={homePitcher}
          homeBatters={homeBatters}
          awayPitcher={awayPitcher}
          awayBatters={awayBatters}
        />
      )}
    </>
  );
}

export default App;
