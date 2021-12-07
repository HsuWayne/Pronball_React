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
    batting: [
      { ...defaultBatter, orderNumber: "1", serialNum: "21", name: "吳大一" },
    ],
    homePitchers: [{ ...defaultPitcher, serialNum: "04", name: "趙小四" }],
    awayPitchers: [{ ...defaultPitcher, serialNum: "24", name: "周大四" }],
    homeBatters: [
      { ...defaultBatter, orderNumber: "1", serialNum: "01", name: "錢小一" },
      { ...defaultBatter, orderNumber: "2", serialNum: "02", name: "孫小二" },
      { ...defaultBatter, orderNumber: "3", serialNum: "03", name: "李小三" },
    ],
    awayBatters: [
      { ...defaultBatter, orderNumber: "1", serialNum: "21", name: "吳大一" },
      { ...defaultBatter, orderNumber: "2", serialNum: "22", name: "鄭大二" },
      { ...defaultBatter, orderNumber: "3", serialNum: "23", name: "王大三" },
    ],
    battingOrder: [
      { ...defaultBatter, orderNumber: "2", serialNum: "22", name: "鄭大二" },
      { ...defaultBatter, orderNumber: "3", serialNum: "23", name: "王大三" },
      { ...defaultBatter, orderNumber: "1", serialNum: "21", name: "吳大一" },
    ], //目前打序

    //測試用參數
  },
  reducers: {
    setGameInning: (state, action) => {
      state.gameInning = action.payload;
    },
    updateHomePitchers: (state, action) => {
      state.homePitchers.unshift(action.payload);
    },
    updateAwayPitchers: (state, action) => {
      state.awayPitchers.unshift(action.payload);
    },
    updateHomeBatters: (state, action) => {
      state.homeBatters = action.payload;
    },
    updateAwayBatters: (state, action) => {
      state.awayBatters = action.payload;
    },
    strikeBall: (state) => {
      state.strike += 1;
      state.pitching[0].strike += 1;
    },
    ballBall: (state) => {
      state.ball += 1;
      state.pitching[0].ball += 1;
    },
    foulBall: (state) => {
      state.pitching[0].strike += 1;
    },
    resetBallsCount: (state) => {
      state.strike = 0;
      state.ball = 0;
    },
    strikeout: (state) => {
      state.out += 1;
      state.pitching[0].k += 1;
      state.pitching[0].o += 1;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).so += 1;
    },
    walk: (state) => {
      state.pitching[0].bbPit += 1;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).bb += 1;
      state.runner.push([state.batting[0], state.pitching[0]]);
      state.runnerBase.push(0);
      state.runnerBase.reverse();
      for (let i = 0; i < state.runnerBase.length; i++) {
        if (state.runnerBase[i] === i) {
          state.runnerBase[i]++;
        }
      }
      state.runnerBase.reverse();
      if (state.runnerBase[0] === 4) {
        state.pitching.find((o) => o.name === state.runner[0][1].name).er++;
        if (state.runner[0][1].name !== state.pitching[0].name) {
          state.pitching.ira++;
        }
        state.battingOrder.find(
          (o) => o.orderNumber === state.runner[0][0].orderNumber
        ).runs += 1;
        state.battingOrder.find(
          (o) => o.orderNumber === state.batting[0].orderNumber
        ).rbi += 1;
        state.runnerBase.shift();
        state.runner.shift();
        console.log("得分");
      }
    },
    single: (state) => {},
    double: (state) => {},
    triple: (state) => {},
    homerun: (state) => {},
    groundOut: (state) => {},
    flyOut: (state) => {},
    changePitcher: (state) => {},
    changeBatter: (state) => {
      state.batting = state.battingOrder.slice(0, 1);
      state.battingOrder.push(state.battingOrder.shift());
    },
    halfInningHandle: (state) => {
      state.out = 0;
      state.runner = [];
      state.runnerBase = [];
      console.log("halfInningHandle");
    },
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
