import React, { lazy } from 'react'
import MenuIcon from '@material-ui/icons/Menu'

const AppIconButton = lazy(()=>import('./app-icon-button'))

export default function AppBrand(props) {
  return (
    <>
      <AppIconButton
        className='drawerToggle'
        edge='start'
        onClick={ props.toggleDrawer }>
        <MenuIcon />
      </AppIconButton>
      TruextendApp
    </>
  )
}
