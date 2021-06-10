import msg from './msg'
import { mergeReducers } from 'use-redux-states'

const appReducer = mergeReducers({ msg })

export default appReducer
