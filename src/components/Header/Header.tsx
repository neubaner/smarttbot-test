import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">Smarttbot CryptoViewer</Typography>
      </Toolbar>
    </AppBar>
  )
}
