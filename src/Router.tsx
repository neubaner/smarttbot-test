import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TickerPage from './pages/TickerPage'
import CurrencyPage from './pages/CurrencyPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/currency/:pair">
          <CurrencyPage />
        </Route>
        <Route path="/">
          <TickerPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
