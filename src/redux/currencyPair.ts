import {
  OrderBook,
  ChartData,
  TradeHistory,
  fetchChartData,
  fetchOrderBook,
  fetchTradeHistory,
} from '../api/poloniex'
import { ThunkAction } from 'redux-thunk'

const REQUEST_CURRENCY_INFO = 'smarttbot/currency_pair/REQUEST_CURRENCY_INFO'
const RECEIVE_CURRENCY_INFO = 'smarttbot/currency_pair/RECEIVE_CURRENCY_INFO'
const ERROR_CURRENCY_INFO = 'smarttbot/currency_pair/ERROR_CURRENCY_INFO'

interface RequestCurrencyInfoAction {
  type: typeof REQUEST_CURRENCY_INFO
  pair: [string, string]
}
interface ReceiveCurrencyInfoAction {
  type: typeof RECEIVE_CURRENCY_INFO
  pair: [string, string]
  orderBook: OrderBook
  chartData: ChartData[]
  tradeHistory: TradeHistory[]
}

interface ErrorCurrencyInfoAction {
  type: typeof ERROR_CURRENCY_INFO
  pair: [string, string]
  error: string
}

type CurrencyInfoAction =
  | RequestCurrencyInfoAction
  | ReceiveCurrencyInfoAction
  | ErrorCurrencyInfoAction

// Decidi juntar todos os dados em um unico item ao invés de criar um
// reducer para cada um deles, pois além de ser mais simples, é necessário
// fazer somente uma busca na store.
// Caso em algum requisito, ou em uma aplicação maior, talvez a melhor opção
// seja desacoplar estes dados
export interface CurrencyPairItem {
  orderBook?: OrderBook
  chartData?: ChartData[]
  tradeHistory?: TradeHistory[]
  isFetching: boolean
  error: string | null
}

export interface CurrencyPairState {
  [key: string]: CurrencyPairItem
}

const initialState: CurrencyPairState = {}

function deriveDataFromAction(
  state: CurrencyPairState,
  action: CurrencyInfoAction
) {
  const pair = action.pair.join('_')

  const currencyInfo = state[pair] ?? {
    isFetching: false,
    error: null,
  }

  return { pair, currencyInfo }
}

export default function reducer(
  state = initialState,
  action: CurrencyInfoAction
): CurrencyPairState {
  switch (action.type) {
    case REQUEST_CURRENCY_INFO: {
      const { pair, currencyInfo } = deriveDataFromAction(state, action)

      return {
        [pair]: {
          ...currencyInfo,
          isFetching: true,
        },
      }
    }
    case RECEIVE_CURRENCY_INFO: {
      const { pair, currencyInfo } = deriveDataFromAction(state, action)

      return {
        [pair]: {
          ...currencyInfo,
          chartData: action.chartData,
          orderBook: action.orderBook,
          tradeHistory: action.tradeHistory,
          isFetching: false,
        },
      }
    }
    case ERROR_CURRENCY_INFO: {
      const { pair, currencyInfo } = deriveDataFromAction(state, action)
      return {
        [pair]: {
          ...currencyInfo,
          error: action.error,
          isFetching: false,
        },
      }
    }
    default:
      return state
  }
}

export function requestCurrencyInfo(
  pair: [string, string]
): RequestCurrencyInfoAction {
  return {
    type: REQUEST_CURRENCY_INFO,
    pair,
  }
}

export function receiveCurrencyInfo(
  pair: [string, string],
  orderBook: OrderBook,
  chartData: ChartData[],
  tradeHistory: TradeHistory[]
): ReceiveCurrencyInfoAction {
  return {
    type: RECEIVE_CURRENCY_INFO,
    pair,
    chartData,
    orderBook,
    tradeHistory,
  }
}

export function errorCurrencyInfo(
  pair: [string, string],
  error: string
): ErrorCurrencyInfoAction {
  return {
    type: ERROR_CURRENCY_INFO,
    pair,
    error,
  }
}

type ThunkResult<T> = ThunkAction<T, CurrencyInfoAction, undefined, any>

export const fetchCurrencyInfo = (
  pair: [string, string]
): ThunkResult<void> => async (dispatch) => {
  dispatch(requestCurrencyInfo(pair))

  try {
    const [chartData, orderBook, tradeHistory] = await Promise.all([
      fetchChartData(pair, 14400, new Date(2010, 1, 1), new Date()),
      fetchOrderBook(pair),
      fetchTradeHistory(pair),
    ])

    dispatch(receiveCurrencyInfo(pair, orderBook, chartData, tradeHistory))
  } catch (err) {
    dispatch(errorCurrencyInfo(pair, err.message))
  }
}
