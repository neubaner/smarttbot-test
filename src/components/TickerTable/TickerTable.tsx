import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { Ticker } from '../../api/poloniex'

const renderDollarSign = (field: string) => (data: any) => `$ ${data[field]}`

const renderPercent = (field: string) => (data: any) =>
  `${(parseFloat(data[field]) * 100).toFixed(2)} %`

const joinCurrencyPair = (pair: [string, string]) => pair.join(' / ')

const columns: Column<Ticker>[] = [
  {
    title: 'Currency pair',
    field: 'currencyPair',
    render: (rowData) => joinCurrencyPair(rowData.currencyPair),
    customFilterAndSearch: (filter, rowData) =>
      joinCurrencyPair(rowData.currencyPair)
        .toLowerCase()
        .includes(filter.toLowerCase()),
  },
  {
    title: 'Last',
    field: 'last',
    type: 'numeric',
    render: renderDollarSign('lowestAsk'),
  },
  {
    title: 'Lowest Ask',
    field: 'lowestAsk',
    type: 'numeric',
    render: renderDollarSign('lowestAsk'),
  },
  {
    title: 'Highest Bid',
    field: 'highestBid',
    type: 'numeric',
    render: renderDollarSign('highestBid'),
  },
  {
    title: 'Percent Change',
    field: 'percentChange',
    type: 'numeric',
    render: renderPercent('percentChange'),
  },
  {
    title: 'Base Volume',
    field: 'baseVolume',
    type: 'numeric',
    render: renderDollarSign('baseVolume'),
  },
  {
    title: 'Quote Volume',
    field: 'quoteVolume',
    type: 'numeric',
    render: renderDollarSign('quoteVolume'),
  },
  {
    title: 'Is Frozen',
    field: 'isFrozen',
    render: (rowData) => (rowData.isFrozen === '0' ? 'No' : 'Yes'),
  },
  {
    title: 'High 24 hours',
    field: 'high24hr',
    type: 'numeric',
    render: renderDollarSign('highestBid'),
  },
  {
    title: 'Low 24 hours',
    field: 'low24hr',
    type: 'numeric',
    render: renderDollarSign('highestBid'),
  },
]

interface TickerTableProps {
  ticker: Ticker[]
}

export default function TickerTable({ ticker }: TickerTableProps) {
  return (
    <MaterialTable
      title="Market Pairs"
      options={{ pageSize: 10 }}
      columns={columns}
      data={ticker}
    />
  )
}
