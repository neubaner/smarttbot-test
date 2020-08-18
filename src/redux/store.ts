import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ticker, { TickerState } from './ticker'

export interface StoreShape {
  ticker: TickerState
}

const rootReducer = combineReducers<StoreShape>({
  ticker,
})

export default function buildStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}
