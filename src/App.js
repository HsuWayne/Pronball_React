// import React, { useState } from "react";
import React from "react";
import "./bootstrap.min.css";
import "./App.css";
import WebNavbar from "./Components/WebNavbar";
// import PlayerListInput from "./Components/PlayerListInput/PlayerListInput";
import Scoreboard from "./Components/Scoreboard/Scoreboard";

function App() {
  // const [playerListSubmitted, setPlayerListSubmitted] = useState(false);
  // const [inning, setInning] = useState("9");

  return (
    <>
      <WebNavbar />
      {/* {!playerListSubmitted ? (
        <PlayerListInput
          setPlayerListSubmitted={setPlayerListSubmitted}
          inning={inning}
          setInning={setInning}
        />
      ) : (
        <Scoreboard inning={inning} />
      )} */}
      <Scoreboard />
    </>
  );
}

export default App;
