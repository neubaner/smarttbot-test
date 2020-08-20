import React from 'react'
import MaterialTable, { Column } from 'material-table'

interface OrderBookTableProps {
  title: string
  data: string[][]
}

const columns: Column<string[]>[] = [
  { title: 'Low', field: 0, type: 'numeric' },
  { title: 'High', field: 1, type: 'numeric' },
]

export default function OrderBookTable({ title, data }: OrderBookTableProps) {
  return <MaterialTable title={title} columns={columns} data={data} />
}
