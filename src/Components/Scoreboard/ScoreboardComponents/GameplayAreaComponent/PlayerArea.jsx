import { Stack } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PitcherInfo from "./PlayerAreaComponent/PitcherInfo";

function PlayerArea() {
  const gameData = useSelector((state) => state.gameData);
  const [pitcherShow, setPitcherShow] = useState(false);

  return (
    <>
      <Stack
        className="pitcher scoreboard_elements align-items-center justify-content-center"
        onClick={() => setPitcherShow(true)}
      >
        {gameData.pitching[0].serialNum}
      </Stack>
      <PitcherInfo pitcherShow={pitcherShow} setPitcherShow={setPitcherShow} />
      <Stack className="batter scoreboard_elements align-items-center justify-content-center">
        {gameData.batting[0].serialNum}
      </Stack>
    </>
  );
}

export default PlayerArea;
