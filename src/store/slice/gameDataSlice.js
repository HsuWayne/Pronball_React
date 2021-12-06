import { createSlice } from "@reduxjs/toolkit";

//測試用參數
import {
  defaultPitcher,
  defaultBatter,
} from "../../Components/PlayerListInput/Player";
//測試用參數

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState: {
    gameInning: 9,
    homePoint: 0,
    awayPoint: 0,
    strike: 0,
    ball: 0,
    out: 0,
    runner: [], //跑者
    runnerBase: [], //跑者所在壘包
    // pitching: [], //目前投手
    // batting: [], //目前打者
    // battingOrder: [], //目前打序
    // homePitchers: [],
    // awayPitchers: [],
    // homeBatters: [],
    // awayBatters: [],

    //測試用參數
    pitching: [{ ...defaultPitcher, serialNum: "04", name: "趙小四" }],
    batting: [{ ...defaultBatter, serialNum: "21", name: "吳大一" }],
    battingOrder: [
      { ...defaultBatter, serialNum: "22", name: "鄭大二" },
      { ...defaultBatter, serialNum: "23", name: "王大三" },
    ],
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
  },
  reducers: {
    setGameInning: (state, action) => {
      state.gameInning = action.payload;
    },
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
    strikeBall: (state) => {
      state.strike += 1;
      state.pitching[state.pitching.length - 1].strike += 1;
    },
    ballBall: (state) => {
      state.ball += 1;
      state.pitching[state.pitching.length - 1].ball += 1;
    },
    foulBall: (state) => {
      state.pitching[state.pitching.length - 1].strike += 1;
    },
    resetBallsCount: (state) => {
      state.strike = 0;
      state.ball = 0;
    },
    strikeout: (state) => {
      state.out += 1;
      state.pitching[state.pitching.length - 1].k += 1;
      state.pitching[state.pitching.length - 1].k += 1;
      state.batting[0].so += 1;
    },
    walk: (state) => {
      state.pitching[state.pitching.length - 1].bbPit += 1;
      state.batting[0].bb += 1;
    },
    single: (state) => {},
    double: (state) => {},
    triple: (state) => {},
    homerun: (state) => {},
    groundOut: (state) => {},
    flyOut: (state) => {},
    changePitcher: (state) => {},
    changeBatter: (state) => {},
    halfInningHandle: (state) => {},
  },
});

export const {
  setGameInning,
  updateHomePitchers,
  updateAwayPitchers,
  updateHomeBatters,
  updateAwayBatters,
  strikeBall,
  ballBall,
  foulBall,
  resetBallsCount,
  strikeout,
  walk,
  single,
  double,
  triple,
  homerun,
  groundOut,
  flyOut,
  changePitcher,
  changeBatter,
  halfInningHandle,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
