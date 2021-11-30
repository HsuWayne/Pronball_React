import React, { useState } from "react";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";

function App() {
  const [playerListSubmitted, setPlayerListSubmitted] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  return (
    <>
      <WebNavbar />
      {!playerListSubmitted ? (
        <PlayerListInput
          setPlayerListSubmitted={setPlayerListSubmitted}
          setPlayerList={setPlayerList}
        />
      ) : (
        <h1>Scoreboard{playerList}</h1>
      )}
    </>
  );
}

export default App;
