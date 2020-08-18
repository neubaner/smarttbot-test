import { fetchTickers, fetchCurrencyInfo, Ticker } from './poloniex'

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
