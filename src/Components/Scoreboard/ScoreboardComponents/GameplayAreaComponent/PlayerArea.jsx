import { Stack } from "react-bootstrap";
import React from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function PlayerArea() {
  // const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);

  return (
    <>
      <Stack className="pitcher scoreboard_elements align-items-center justify-content-center">
        {gameData.pitching[0].serialNum}
      </Stack>
      <Stack className="batter scoreboard_elements align-items-center justify-content-center">
        {gameData.batting[0].serialNum}
      </Stack>
    </>
  );
}

export default PlayerArea;
