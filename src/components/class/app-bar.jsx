import React, { Component, lazy } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const AppBrand = lazy(()=>import('../function/app-brand'))
const AppDrawer = lazy(()=>import('../function/app-drawer'))

class NavBar extends Component {
  render() {
    return (
      <>
        <AppBar 
          position='sticky' 
          color='default'
          elevation={ 0 }
          className={ this.props.className }>
          <Toolbar>
              <AppBrand />
          </Toolbar>
        </AppBar>
        <AppDrawer />
      </>
    )
  }
}

export default NavBar
