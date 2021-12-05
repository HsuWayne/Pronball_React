import { createSlice } from "@reduxjs/toolkit";

export const ballsCountSlice = createSlice({
  name: "ballsCount",
  initialState: {
    strike: 0,
    ball: 0,
  },
  reducers: {
    strikeBall: (state) => {
      state.strike += 1;
    },
    ballBall: (state) => {
      state.ball += 1;
    },
    resetBallsCount: (state) => {
      state.strike = 0;
      state.ball = 0;
    },
  },
});

export const {
  strikeBall,
  ballBall,
  resetBallsCount,
} = ballsCountSlice.actions;

export default ballsCountSlice.reducer;
