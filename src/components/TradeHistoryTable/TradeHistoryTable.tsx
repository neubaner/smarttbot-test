import React from 'react'
import { TradeHistory } from '../../api/poloniex'
import MaterialTable, { Column } from 'material-table'

interface TradeHistoryTableProps {
  tradeHistory: TradeHistory[]
}

const columns: Column<TradeHistory>[] = [
  { title: 'Global Trade ID', field: 'globalTradeID', type: 'numeric' },
  { title: 'Trade ID', field: 'tradeID', type: 'numeric' },
  { title: 'Date', field: 'date', type: 'datetime' },
  { title: 'Type', field: 'type' },
  { title: 'Rate', field: 'rate', type: 'numeric' },
  { title: 'Amount', field: 'amount', type: 'numeric' },
  { title: 'Total', field: 'total', type: 'numeric' },
]

export default function TradeHistoryTable({
  tradeHistory,
}: TradeHistoryTableProps) {
  return (
    <MaterialTable
      title="Trade History"
      columns={columns}
      data={tradeHistory}
    />
  )
}
