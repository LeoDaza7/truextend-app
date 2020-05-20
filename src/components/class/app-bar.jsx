import React, { Component, lazy } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const AppBrand = lazy(()=>import('../function/app-brand'))

class NavBar extends Component {
  render() {
    return (
      <AppBar 
        position='sticky' 
        color='default'
        elevation={ 0 }>
        <Toolbar>
            <AppBrand />
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar
