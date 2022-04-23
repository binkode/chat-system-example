import msg from './msg'
import app from './app'
import { mergeReducers } from 'use-redux-states'

const appReducer = mergeReducers({ msg, app })

export default appReducer
