import {
  fetchTickers,
  fetchCurrencyInfo,
  Ticker,
  fetchOrderBook,
  fetchChartData,
  fetchTradeHistory,
} from './poloniex'

const currencyPair: [string, string] = ['BTC', 'BTS']

describe('fetchTicker', () => {
  let ticker: Ticker[]

  beforeAll(async () => {
    ticker = await fetchTickers()
  })

  it('should return valid ticker data', async () => {
    expect(Array.isArray(ticker)).toBe(true)
    expect(ticker.length).toBeGreaterThan(0)
  })

  it('should have a valid currencyPair property', async () => {
    const currencyPair = ticker[0].currencyPair

    expect(Array.isArray(currencyPair)).toBe(true)
    expect(currencyPair.length).toBe(2)
  })
})

describe('fetchCurrencyInfo', () => {
  it('should return valid currency info', async () => {
    const result = await fetchCurrencyInfo()

    expect(Object.keys(result).length).toBeGreaterThan(0)
  })
})

describe('fetchOrderBook', () => {
  it('should return a valid order book', async () => {
    const result = await fetchOrderBook(currencyPair)

    expect(result).toHaveProperty('asks')
    expect(result).toHaveProperty('bids')
  })
})

describe('fetchChartData', () => {
  it('should return a valid chart data', async () => {
    const result = await fetchChartData(
      currencyPair,
      14400,
      new Date(2010, 1, 1),
      new Date()
    )

    expect(Array.isArray(result)).toBe(true)
  })
})

describe('fetchTradeHistory', () => {
  it('should return a valid trade history', async () => {
    const result = await fetchTradeHistory(currencyPair)

    expect(Array.isArray(result)).toBe(true)
  })
})
