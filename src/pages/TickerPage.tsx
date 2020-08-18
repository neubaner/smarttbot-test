import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TickerTable from '../components/TickerTable/TickerTable'
import { StoreShape } from '../redux/store'
import { TickerState, fetchTickers } from '../redux/ticker'
import { Container, makeStyles } from '@material-ui/core'

export default function TickerPage() {
  const ticker = useSelector<StoreShape, TickerState>((state) => state.ticker)
  const dispatch = useDispatch()

  const styles = useStyles()

  useEffect(() => {
    const tickerId = setInterval(async () => {
      dispatch(fetchTickers())
    }, 1000)

    return () => {
      clearInterval(tickerId)
    }
  }, [dispatch])

  return (
    <Container component="main" maxWidth="xl" className={styles.container}>
      {ticker && <TickerTable ticker={ticker.items} />}
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))
