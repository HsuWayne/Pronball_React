import {
  createSlice
} from "@reduxjs/toolkit";

export const playerListSlice = createSlice({
  name: "playerList",
  initialState: {
    homePitchers: [],
    awayPitchers: [],
    homeBatters: [],
    awayBatters: [],
  },
  reducers: {
    updateHomePitchers: (state, action) => {
      state.homePitchers.push(action.payload)
    },
    updateAwayPitchers: (state, action) => {
      state.awayPitchers.push(action.payload)
    },
    updateHomeBatters: (state, action) => {
      state.homeBatters = action.payload
    },
    updateAwayBatters: (state, action) => {
      state.awayBatters = action.payload
    },
  },
});

export const {
  updateHomePitchers,
  updateAwayPitchers,
  updateHomeBatters,
  updateAwayBatters
} = playerListSlice.actions;

export default playerListSlice.reducer;