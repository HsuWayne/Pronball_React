import React from "react";
import InputPitcher from "./InputPitcher";
import InputPitcherFromDB from "./InputPitcherFromDB";
import InputBatter from "./InputBatter";
import InputBatterFromDB from "./InputBatterFromDB";
import { useSelector } from "react-redux";

function InputPlayer(props) {
  const {
    team,
    pitcherList,
    batterList,
    setPitcherList,
    setBatterList,
  } = props;

  const gameData = useSelector((state) => state.gameData);

  return (
    <>
      <div className="form_subtitle">
        {team === "home" ? "登錄主隊球員資訊" : "登錄客隊球員資訊"}
      </div>
      {gameData.playerListFromDB.length === 0 ? (
        <>
          <InputPitcher
            team={team}
            setPitcherList={setPitcherList}
            pitcherList={pitcherList}
          />
          <InputBatter
            team={team}
            setBatterList={setBatterList}
            batterList={batterList}
          />
        </>
      ) : (
        <>
          <InputPitcherFromDB
            team={team}
            setPitcherList={setPitcherList}
            pitcherList={pitcherList}
          />
          <InputBatterFromDB
            team={team}
            setBatterList={setBatterList}
            batterList={batterList}
          />
        </>
      )}
    </>
  );
}

export default InputPlayer;
