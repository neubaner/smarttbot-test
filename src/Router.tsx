import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TickerPage from './pages/TickerPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <TickerPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
