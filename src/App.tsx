import React, { useState, useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import buildStore from './redux/store'
import Router from './Router'

const store = buildStore()

function App() {
  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  )
}

export default App
