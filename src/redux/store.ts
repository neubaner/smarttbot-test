import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ticker, { TickerState } from './ticker'
import currencyInfo, { CurrencyPairState } from './currencyPair'

export interface StoreShape {
  ticker: TickerState
  currencyInfo: CurrencyPairState
}

const rootReducer = combineReducers<StoreShape>({
  ticker,
  currencyInfo,
})

export default function buildStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}
