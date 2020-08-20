import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TickerTable from '../components/TickerTable/TickerTable'
import { StoreShape } from '../redux/store'
import { TickerState, fetchTickers } from '../redux/ticker'
import { Container, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

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

  if (ticker) {
    if (ticker.error) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {ticker.error}
        </Alert>
      )
    }

    return (
      <Container component="main" maxWidth="xl" className={styles.container}>
        <TickerTable ticker={ticker.items} />
      </Container>
    )
  }

  return null
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))
