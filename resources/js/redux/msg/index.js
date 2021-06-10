import { createSlice } from '@reduxjs/toolkit'

const INIT_STATE = {
  conversations: {},
  msgs: {}
}

const { actions, reducer } = createSlice({
  name: 'msg',
  initialState: INIT_STATE,
  reducers: { add: () => {} }
})

export const { add } = actions

export default reducer
