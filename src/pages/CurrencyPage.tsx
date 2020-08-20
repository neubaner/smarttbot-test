import React, { useEffect, useMemo } from 'react'
import {
  Typography,
  Container,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useParams } from 'react-router'

import CandleStickChart from '../components/CandleStickChart/CandleStickChart'

import OrderBookTable from '../components/OrderBookTable/OrderBookTable'
import TradeHistoryTable from '../components/TradeHistoryTable/TradeHistoryTable'
import { useSelector, useDispatch } from 'react-redux'
import { StoreShape } from '../redux/store'
import { CurrencyPairItem, fetchCurrencyInfo } from '../redux/currencyPair'

interface Params {
  pair: string
}

export default function CurrencyPage() {
  const { pair } = useParams<Params>()
  const parsedPair = useMemo(() => pair.split('_') as [string, string], [pair])

  const dispatch = useDispatch()
  const currencyInfo = useSelector<StoreShape, CurrencyPairItem | undefined>(
    (state) => state.currencyInfo[pair]
  )

  const styles = useStyles()

  useEffect(() => {
    dispatch(fetchCurrencyInfo(parsedPair))
  }, [dispatch, parsedPair])

  function renderCurrencyInfo() {
    if (!currencyInfo || currencyInfo.isFetching) {
      return (
        <div className={styles.spinnerContainer}>
          <CircularProgress />
        </div>
      )
    }

    if (currencyInfo.error) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {currencyInfo.error}
        </Alert>
      )
    }

    const { orderBook, chartData, tradeHistory } = currencyInfo

    return (
      <>
        {chartData && (
          <div className={styles.item}>
            <Typography variant="h6">Market Chart</Typography>
            <CandleStickChart chartData={chartData} />
          </div>
        )}
        {orderBook && (
          <div className={styles.item}>
            <div className={styles.orderBookContainer}>
              <div className={styles.orderBookItem}>
                <OrderBookTable title="Asks" data={orderBook.asks} />
              </div>
              <div className={styles.orderBookItem}>
                <OrderBookTable title="Bids" data={orderBook.bids} />
              </div>
            </div>
          </div>
        )}
        {tradeHistory && (
          <div className={styles.item}>
            <TradeHistoryTable tradeHistory={tradeHistory} />
          </div>
        )}
      </>
    )
  }

  return (
    <Container className={styles.container}>
      <Typography variant="h5">{parsedPair.join(' / ')}</Typography>
      {renderCurrencyInfo()}
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(3),
  },
  item: {
    marginTop: theme.spacing(1),
  },
  orderBookContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  orderBookItem: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
}))
