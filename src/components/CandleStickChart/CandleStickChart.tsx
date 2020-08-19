// Baseado neste exemplo https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickStockScaleChartWithVolumeBarV1?file=/src/Chart.js

import React, { useMemo } from 'react'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'
import { ChartData } from '../../api/poloniex'

export interface CandleStickChartProps {
  chartData: ChartData[]
  width: number
  ratio: number
}

const CandleStickChart = fitWidth(function CandleStickChart({
  chartData: initialData,
  width,
  ratio,
}: CandleStickChartProps) {
  const parsedData = useMemo(
    () =>
      initialData.map((data) => {
        return {
          ...data,
          date: new Date(data.date * 1000),
        }
      }),
    [initialData]
  )

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d: ChartData) => d.date
  )
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    parsedData
  )

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [start, end]

  return (
    <ChartCanvas
      type="hybrid"
      height={600}
      width={width}
      ratio={ratio}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      useCrossHairStyleCursor={true}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d: ChartData) => [d.high, d.low]}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          stroke="#FFFFFF"
          tickStroke="#FFFFFF"
        />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={9}
          tickStroke="#FFFFFF"
          stroke="#FFFFFF"
          tickFormat={format('.4s')}
        />
        <CandlestickSeries />

        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat('%Y-%m-%d')}
        />
        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format('.4s')}
        />
      </Chart>
      <Chart id={2} yExtents={(d: ChartData) => d.volume}>
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          tickFormat={format('.2s')}
          tickStroke="#FFFFFF"
        />
        <BarSeries yAccessor={(d: ChartData) => d.volume} />
      </Chart>
      <CrossHairCursor stroke="#FFFFFF" />
    </ChartCanvas>
  )
})

export default CandleStickChart
