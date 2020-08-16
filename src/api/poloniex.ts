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

const baseApiUrl = process.env.REACT_APP_POLONIEX_BASE_URL

export async function fetchCurrencyInfo(): Promise<CurrencyInfoResponse> {
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
