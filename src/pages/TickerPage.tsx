import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TickerTable from '../components/TickerTable/TickerTable'
import { StoreShape } from '../redux/store'
import { TickerState, fetchTickers } from '../redux/ticker'

export default function TickerPage() {
  const ticker = useSelector<StoreShape, TickerState>((state) => state.ticker)
  const dispatch = useDispatch()

  useEffect(() => {
    const tickerId = setInterval(async () => {
      dispatch(fetchTickers())
    }, 1000)

    return () => {
      clearInterval(tickerId)
    }
  }, [dispatch])

  return (
    <div style={{ minWidth: '100%' }}>
      {ticker && <TickerTable ticker={ticker.items} />}
    </div>
  )
}
