import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  conversations: {},
  msgs: {},
};

const { actions, reducer } = createSlice({
  name: "msg",
  initialState: INIT_STATE,
  reducers: {},
});

export const {} = actions;

export default reducer;
