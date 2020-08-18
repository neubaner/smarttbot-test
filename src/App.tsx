import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import buildStore from './redux/store'
import Router from './Router'
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  makeStyles,
} from '@material-ui/core'
import Header from './components/Header/Header'

const store = buildStore()

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

function App() {
  const styles = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <CssBaseline />
        <Header />
        <div className={styles.appbarSpacer} />
        <Router />
      </ReduxProvider>
    </ThemeProvider>
  )
}

const useStyles = makeStyles((theme) => ({
  appbarSpacer: theme.mixins.toolbar,
}))

export default App
