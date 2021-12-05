import { configureStore } from "@reduxjs/toolkit";
import playerListReducer from "./slice/playerListSlice";
import ballsCountReducer from "./slice/ballsCountSlice";

export default configureStore({
  reducer: {
    playerList: playerListReducer,
    ballsCount: ballsCountReducer,
  },
});
