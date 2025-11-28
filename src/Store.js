import { configureStore } from "@reduxjs/toolkit";
import logsReducer from "./LogSlice";

export default configureStore({
  reducer: {
    logBag: logsReducer,
  },
});
