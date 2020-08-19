import React, { useEffect, useState } from 'react'
import CandleStickChart from '../components/CandleStickChart/CandleStickChart'
import { fetchChartData, ChartData } from '../api/poloniex'
import { Typography, Container } from '@material-ui/core'

export default function CurrencyPage() {
  const [chart, setChart] = useState<ChartData[]>()

  useEffect(() => {
    fetchChartData(
      ['BTC', 'BTS'],
      14400,
      new Date(2010, 1, 1),
      new Date()
    ).then((chart) => setChart(chart))
  }, [])

  if (chart) {
    return (
      <Container>
        <Typography variant="h5">BTC / BTS</Typography>
        <CandleStickChart chartData={chart} />
      </Container>
    )
  } else {
    return null
  }
}
