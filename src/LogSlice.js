import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    total: 0,
    filters: {},
  },
  reducers: {
    setLogs: (state, action) => {
      console.log(action, "action111111");
      state.logs = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setFilters: (state, action) => {
      console.log(action, "filter action");

      state.filters = action.payload;
    },
  },
});

export const { setLogs, setTotal, setFilters } = logSlice.actions;

export default logSlice.reducer;
