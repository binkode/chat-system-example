import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {};

const { actions, reducer } = createSlice({
  name: "app",
  initialState: INIT_STATE,
  reducers: {
    logOut: () => {
      localStorage.clear();
    },
  },
});

export const { logOut } = actions;

export default reducer;
