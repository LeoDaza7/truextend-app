import React, { lazy } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { Typography } from '@material-ui/core'

const AppIconButton = lazy(()=>import('./app-icon-button'))

export default function AppBrand(props) {
  return (
      <Grid container justify='flex-start' alignItems='center'>
        <Grid item>
          <AppIconButton
            className='drawerToggle'
            edge='start'
            onClick={ props.toggleDrawer }>
            <MenuIcon />
          </AppIconButton>
        </Grid>
        <Hidden xsDown>
          <Grid item>
            <Typography variant='body1'>
              TruextendApp
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
  )
}
