import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TickerPage from './pages/TickerPage'
import { Toolbar } from '@material-ui/core'

export default function Router() {
  return (
    <BrowserRouter>
      <Toolbar>
        <Switch>
          <Route path="/">
            <TickerPage />
          </Route>
        </Switch>
      </Toolbar>
    </BrowserRouter>
  )
}
