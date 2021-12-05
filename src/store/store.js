import { configureStore } from "@reduxjs/toolkit";
import playerListReducer from "./slice/playerListSlice";

export default configureStore({
  reducer: {
    playerList: playerListReducer,
  },
});
