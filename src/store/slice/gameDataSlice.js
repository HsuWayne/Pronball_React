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
    currentInning: 0,
    topInning: false,
    lastHalfCheck: false,
    homePoint: 0,
    homePointList: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    awayPoint: 0,
    awayPointList: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    strike: 0,
    ball: 0,
    out: 0,
    runner: [], //跑者
    runnerBase: [], //跑者所在壘包
    charge: false, //趨前守備
    // pitching: [], //目前投手
    // batting: [], //目前打者
    // battingOrder: [], //目前打序
    // homePitchers: [],
    // awayPitchers: [],
    // homeBatters: [],
    // awayBatters: [],

    //測試用參數
    pitching: [{ ...defaultPitcher }],
    batting: [{ ...defaultBatter }],
    battingOrder: [{ ...defaultBatter }],
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
    //測試用參數
  },
  reducers: {
    setGameInning: (state, action) => {
      state.gameInning = action.payload;
      state.homePointList = Array(action.payload).fill(0);
      state.awayPointList = Array(action.payload).fill(0);
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
      state.strike++;
      state.pitching[0].strike++;
    },
    ballBall: (state) => {
      state.ball++;
      state.pitching[0].ball++;
    },
    foulBall: (state) => {
      state.pitching[0].strike++;
    },
    resetBallsCount: (state) => {
      state.strike = 0;
      state.ball = 0;
    },
    strikeout: (state) => {
      state.out++;
      state.pitching[0].k++;
      state.pitching[0].o++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).so++;
    },
    walk: (state) => {
      state.pitching[0].bbPit++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).bb++;
    },
    updateHit: (state, action) => {
      state.pitching[0].h++;
      state.pitching[0].strike++;
      if (action.payload === 1) {
        state.battingOrder.find(
          (o) => o.orderNumber === state.batting[0].orderNumber
        ).single++;
      } else if (action.payload === 2) {
        state.battingOrder.find(
          (o) => o.orderNumber === state.batting[0].orderNumber
        ).double++;
      } else if (action.payload === 3) {
        state.battingOrder.find(
          (o) => o.orderNumber === state.batting[0].orderNumber
        ).triple++;
      } else {
        state.battingOrder.find(
          (o) => o.orderNumber === state.batting[0].orderNumber
        ).homerun++;
        state.pitching[0].hr++;
      }
    },
    groundOut: (state) => {
      state.out++;
      state.pitching[0].o++;
      state.pitching[0].strike++;
      state.pitching[0].goPit++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).go++;
      if (state.out <= 2) {
        state.batting = state.battingOrder.slice(0, 1);
        state.battingOrder.push(state.battingOrder.shift());
        state.charge = false;
      }
    },
    sacrificeHit: (state) => {
      state.out++;
      state.pitching[0].o++;
      state.pitching[0].strike++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).sh++;
    },
    doublePlay: (state) => {
      state.out++;
      state.pitching[0].o++;
      state.pitching[0].dpPit++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).dp++;
    },
    flyOut: (state) => {
      state.out++;
      state.pitching[0].o++;
      state.pitching[0].strike++;
      state.pitching[0].aoPit++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).ao++;
      if (state.out <= 2) {
        state.batting = state.battingOrder.slice(0, 1);
        state.battingOrder.push(state.battingOrder.shift());
        state.charge = false;
      }
    },
    sacrificeFly: (state) => {
      state.out++;
      state.pitching[0].o++;
      state.pitching[0].strike++;
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).sf++;
    },
    updateScored: (state) => {
      if (state.topInning) {
        state.awayPoint++;
        state.awayPointList[state.currentInning - 1]++;
      } else {
        state.homePoint++;
        state.homePointList[state.currentInning - 1]++;
      }
    },
    updateRunner: (state, action) => {
      state.runner = action.payload;
    },
    updateRunnerBase: (state, action) => {
      state.runnerBase = action.payload;
    },
    updatePitcherEr: (state, action) => {
      state.pitching.find((o) => o.name === action.payload).er++;
    },
    updatePitcherIra: (state) => {
      state.pitching[0].ira++;
    },
    updateRunnerRuns: (state, action) => {
      state.battingOrder.find((o) => o.orderNumber === action.payload).runs++;
    },
    updateBatterRbi: (state) => {
      state.battingOrder.find(
        (o) => o.orderNumber === state.batting[0].orderNumber
      ).rbi++;
    },
    setCharge: (state) => {
      state.charge = !state.charge;
    },
    changePitcher: (state, action) => {
      state.pitching.unshift(action.payload);
    },
    changeBatter: (state) => {
      state.batting = state.battingOrder.slice(0, 1);
      state.battingOrder.push(state.battingOrder.shift());
      state.charge = false;
    },
    halfInningHandle: (state) => {
      state.out = 0;
      state.runner = [];
      state.runnerBase = [];
      state.charge = false;
      if (state.topInning) {
        if (state.pitching) {
          state.homePitchers = state.pitching;
          state.awayBatters = state.battingOrder;
        }
        state.pitching = state.awayPitchers;
        state.battingOrder = state.homeBatters;
      } else {
        state.currentInning++;
        if (state.pitching) {
          state.awayPitchers = state.pitching;
          state.homeBatters = state.battingOrder;
        }
        state.pitching = state.homePitchers;
        state.battingOrder = state.awayBatters;
      }
      state.topInning = !state.topInning;
      state.batting = state.battingOrder.slice(0, 1);
      state.battingOrder.push(state.battingOrder.shift());
      console.log("halfInningHandle");
    },
    //測試用
    setTest: (state) => {
      state.currentInning++;
      state.pitching = state.homePitchers;
      state.battingOrder = state.awayBatters;
      state.pointing = state.awayPoint;
      state.pointingList = state.awayPointList;
      state.topInning = !state.topInning;
      state.batting = state.battingOrder.slice(0, 1);
      state.battingOrder.push(state.battingOrder.shift());
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
  updateHit,
  groundOut,
  sacrificeHit,
  doublePlay,
  flyOut,
  sacrificeFly,
  updateScored,
  updateRunner,
  updateRunnerBase,
  updatePitcherEr,
  updatePitcherIra,
  updateRunnerRuns,
  updateBatterRbi,
  setCharge,
  changePitcher,
  changeBatter,
  halfInningHandle,
  setTest,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
