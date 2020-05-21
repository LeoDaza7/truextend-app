import React, { Suspense, lazy } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'

const AppRouter = lazy(()=>import('../router/app-router'))

export default function Layout() {
  const classes = useStyles()
  return (
    <Paper>
      <Suspense fallback={<>Loading...</>}>
        <AppRouter classes={ classes }/>
      </Suspense>
    </Paper>
  )
}

const useStyles = makeStyles((theme)=>({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}))
