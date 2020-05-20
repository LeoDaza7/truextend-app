import React, { Suspense, lazy } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'

const AppBar = lazy(()=>import('../class/app-bar'))
const AppRouter = lazy(()=>import('../router/app-router'))

export default function Layout() {
  const classes = useStyles()
  return (
    <Paper>
      <Suspense fallback={<>Loading...</>}>
        <AppBar className={ classes.appBar }/>
        <Grid container>
          <Grid item xs={12} >
            <Box mx='auto' width='95%' >
              <AppRouter />
            </Box>
          </Grid>
        </Grid>
      </Suspense>
    </Paper>
  )
}

const useStyles = makeStyles((theme)=>({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}))
