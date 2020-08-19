import React, { useEffect, useState } from 'react'
import CandleStickChart from '../components/CandleStickChart/CandleStickChart'
import {
  fetchChartData,
  ChartData,
  OrderBook,
  fetchOrderBook,
  TradeHistory,
  fetchTradeHistory,
} from '../api/poloniex'
import { Typography, Container } from '@material-ui/core'
import { OrderBookTable } from '../components/OrderBookTable/OrderBookTable'
import TradeHistoryTable from '../components/TradeHistoryTable/TradeHistoryTable'

export default function CurrencyPage() {
  const [chart, setChart] = useState<ChartData[]>()
  const [orderBook, setOrderBook] = useState<OrderBook>()
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>()

  useEffect(() => {
    const pair: [string, string] = ['BTC', 'BTS']

    fetchChartData(
      pair,
      14400,
      new Date(2010, 1, 1),
      new Date()
    ).then((chart) => setChart(chart))

    fetchOrderBook(pair).then((orderBook) => setOrderBook(orderBook))

    fetchTradeHistory(pair).then((tradeHistory) =>
      setTradeHistory(tradeHistory)
    )
  }, [])

  if (chart) {
    return (
      <Container>
        <Typography variant="h5">BTC / BTS</Typography>
        <CandleStickChart chartData={chart} />
        {orderBook && (
          <>
            <OrderBookTable title="Asks" data={orderBook.asks} />
            <OrderBookTable title="Bids" data={orderBook.bids} />
          </>
        )}
        {tradeHistory && <TradeHistoryTable tradeHistory={tradeHistory} />}
      </Container>
    )
  } else {
    return null
  }
}
