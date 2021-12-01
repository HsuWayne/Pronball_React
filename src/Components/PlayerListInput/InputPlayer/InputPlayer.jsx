import React from "react";
import InputPitcher from "./InputPitcher";
import InputBatter from "./InputBatter";

function InputPlayer(props) {
  let team = props.team;
  return (
    <>
      <div className="form_subtitle">
        {team === "home" ? "登錄主隊球員資訊" : "登錄客隊球員資訊"}
      </div>
      <InputPitcher
        team={team}
        setPitcherList={props.setPitcherList}
        pitcherList={props.pitcherList}
      />
      <InputBatter
        team={team}
        setBatterList={props.setBatterList}
        batterList={props.batterList}
      />
    </>
  );
}

export default InputPlayer;
