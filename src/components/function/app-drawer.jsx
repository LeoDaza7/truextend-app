import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'

const DrawerItems = lazy(()=>import('./drawer-items'))

export default function AppDrawer(props) {
  const classes = useStyles()
  return (
    <Drawer
      open
      variant='persistent'>
      <div className={classes.toolbar} />
      <DrawerItems />
    </Drawer>
  )
}

const useStyles = makeStyles((theme)=>({
  toolbar: theme.mixins.toolbar
}))
