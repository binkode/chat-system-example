import { configureStore } from '@reduxjs/toolkit'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import reducers from './reducers'
import { setConfig } from 'use-redux-states'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  stateReconciler: hardSet
  // blacklist: ['app'],
  // whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: []
})

setConfig({ cleanup: false })

export const persistor = persistStore(store)

export default store
