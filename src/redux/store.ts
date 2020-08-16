import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ticker from './ticker'

const rootReducer = combineReducers({
  ticker,
})

export default function buildStore() {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}
