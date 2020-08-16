import { ThunkAction } from 'redux-thunk'
import { Ticker, fetchTickers as apiFetchTickers } from '../api/poloniex'

const REQUEST_TICKERS = 'smarttbot/ticker/REQUEST_TICKERS'
const RECEIVE_TICKERS = 'smarttbot/ticker/RECEIVE_TICKERS'
const ERROR_TICKERS = 'smarttbot/ticker/ERROR_TICKERS'

interface RequestTickersAction {
  type: typeof REQUEST_TICKERS
}

interface ReceiveTickersAction {
  type: typeof RECEIVE_TICKERS
  tickers: Ticker[]
}

interface ErrorTickersAction {
  type: typeof ERROR_TICKERS
  error: string
}

type TickerActions =
  | RequestTickersAction
  | ReceiveTickersAction
  | ErrorTickersAction

interface TickerState {
  isFetching: boolean
  items: Ticker[]
  error: string | null
}

const initialState: TickerState = {
  isFetching: false,
  items: [],
  error: null,
}

export default function reducer(
  state = initialState,
  action: TickerActions
): TickerState {
  switch (action.type) {
    case REQUEST_TICKERS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_TICKERS:
      return {
        ...state,
        items: action.tickers,
        isFetching: false,
      }
    case ERROR_TICKERS:
      return {
        ...state,
        error: state.error,
        isFetching: false,
      }
    default:
      return state
  }
}

export function requestTickers(): RequestTickersAction {
  return {
    type: REQUEST_TICKERS,
  }
}

export function receiveTickers(tickers: Ticker[]): ReceiveTickersAction {
  return {
    type: RECEIVE_TICKERS,
    tickers,
  }
}

export function errorTickers(error: string): ErrorTickersAction {
  return {
    type: ERROR_TICKERS,
    error,
  }
}

type ThunkResult<T> = ThunkAction<T, TickerActions, undefined, any>

export const fetchTickers = (): ThunkResult<void> => async (dispatch) => {
  dispatch(requestTickers())

  try {
    const tickers = await apiFetchTickers()
    dispatch(receiveTickers(tickers))
  } catch (err) {
    dispatch(errorTickers(err.message))
  }
}
