import { configureStore } from "@reduxjs/toolkit";
import gameDataReducer from "./slice/gameDataSlice";

export default configureStore({
  reducer: {
    gameData: gameDataReducer,
  },
});
