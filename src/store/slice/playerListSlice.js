import { createSlice } from "@reduxjs/toolkit";

//測試用參數
import {
  defaultPitcher,
  defaultBatter,
} from "../../Components/PlayerListInput/Player";
//測試用參數

export const playerListSlice = createSlice({
  name: "playerList",
  initialState: {
    //測試用參數
    homePitchers: [{ ...defaultPitcher, serialNum: "04", name: "趙小四" }],
    awayPitchers: [{ ...defaultPitcher, serialNum: "24", name: "周大四" }],
    homeBatters: [
      { ...defaultBatter, serialNum: "01", name: "錢小一" },
      { ...defaultBatter, serialNum: "02", name: "孫小二" },
      { ...defaultBatter, serialNum: "03", name: "李小三" },
    ],
    awayBatters: [
      { ...defaultBatter, serialNum: "21", name: "吳大一" },
      { ...defaultBatter, serialNum: "22", name: "鄭大二" },
      { ...defaultBatter, serialNum: "23", name: "王大三" },
    ],
    //測試用參數

    // homePitchers: [],
    // awayPitchers: [],
    // homeBatters: [],
    // awayBatters: [],
  },
  reducers: {
    updateHomePitchers: (state, action) => {
      state.homePitchers.push(action.payload);
    },
    updateAwayPitchers: (state, action) => {
      state.awayPitchers.push(action.payload);
    },
    updateHomeBatters: (state, action) => {
      state.homeBatters = action.payload;
    },
    updateAwayBatters: (state, action) => {
      state.awayBatters = action.payload;
    },
  },
});

export const {
  updateHomePitchers,
  updateAwayPitchers,
  updateHomeBatters,
  updateAwayBatters,
} = playerListSlice.actions;

export default playerListSlice.reducer;
