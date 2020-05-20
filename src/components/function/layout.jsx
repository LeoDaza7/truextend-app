import React, { Suspense, lazy } from 'react'
import Paper from '@material-ui/core/Paper'

const AppBar = lazy(()=>import('../class/app-bar'))
const AppRouter = lazy(()=>import('../router/app-router'))

export default function Layout() {
  return (
    <Paper>
      <Suspense fallback={<>Loading...</>}>
        <AppBar />
        <AppRouter />
      </Suspense>
    </Paper>
  )
}
