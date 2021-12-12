import React, { useState } from "react";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";
import Scoreboard from "./Components/Scoreboard/Scoreboard";

function App() {
  const [playerListSubmitted, setPlayerListSubmitted] = useState(false);

  return (
    <>
      <WebNavbar />
      {!playerListSubmitted ? (
        <PlayerListInput setPlayerListSubmitted={setPlayerListSubmitted} />
      ) : (
        <Scoreboard />
      )}
    </>
  );
}

export default App;
