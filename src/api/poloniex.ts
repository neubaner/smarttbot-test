export interface Currency {
  name: string
  txFee: string
  minConf: number
  disabled: number
  delisted: number
  frozen: number
}

export interface CurrencyInfoResponse {
  [key: string]: Currency
}

export interface Ticker {
  currencyPair: [string, string]
  last: string
  lowestAsk: string
  highestBid: string
  percentChange: string
  baseVolume: string
  quoteVolume: string
  isFrozen: string
  high24hr: string
  low24hr: string
}

export interface OrderBook {
  asks: string[][]
  bids: string[][]
  isFrozen: string
  seq: number
}

export interface ChartData {
  date: number
  high: number
  low: number
  open: number
  close: number
  volume: number
  quoteVolume: number
  weightedAverage: number
}

export interface TradeHistory {
  globalTradeId: number
  tradeId: number
  date: Date
  type: string
  rate: string
  amount: string
  total: string
}

const baseApiUrl = process.env.REACT_APP_POLONIEX_BASE_URL

export async function fetchCurrencyInfo() {
  const response = await fetch(`${baseApiUrl}/public?command=returnCurrencies`)
  const responseData = await response.json()

  return responseData as CurrencyInfoResponse
}

export async function fetchTickers(): Promise<Ticker[]> {
  const response = await fetch(`${baseApiUrl}/public?command=returnTicker`)
  const responseData = await response.json()

  return Object.keys(responseData).map((ticker) => ({
    currencyPair: ticker.split('_'),
    ...responseData[ticker],
  }))
}

export async function fetchOrderBook(pair: [string, string]) {
  const response = await fetch(
    `${baseApiUrl}/public?command=returnOrderBook&currencyPair=${pair.join(
      '_'
    )}`
  )

  const responseData = await response.json()

  return responseData as OrderBook
}

export async function fetchChartData(
  pair: [string, string],
  period: number,
  start: Date,
  end: Date
) {
  const response = await fetch(
    `${baseApiUrl}/public?command=returnChartData` +
      `&currencyPair=${pair.join('_')}` +
      `&period=${period}` +
      `&start=${Math.floor(start.getTime() / 1000)}` +
      `&end=${Math.floor(end.getTime() / 1000)}`
  )

  const responseData = await response.json()

  return responseData as ChartData[]
}

export async function fetchTradeHistory(
  pair: [string, string]
): Promise<TradeHistory[]> {
  const response = await fetch(
    `${baseApiUrl}/public?command=returnTradeHistory&currencyPair=${pair.join(
      '_'
    )}`
  )

  const responseData = await response.json()

  return responseData.map((data: TradeHistory) => ({
    ...data,
    date: new Date(data.date),
  }))
}
