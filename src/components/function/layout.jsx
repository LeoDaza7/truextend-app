import React, { Suspense, lazy } from 'react'
import Paper from '@material-ui/core/Paper'

const AppRouter = lazy(()=>import('../router/app-router'))

export default function Layout() {
  return (
    <Paper>
      <Suspense fallback={<>Loading...</>}>
        <AppRouter />
      </Suspense>
    </Paper>
  )
}
