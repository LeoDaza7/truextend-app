import React, { Component, lazy } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const AppBrand = lazy(()=>import('../function/app-brand'))
const AppDrawer = lazy(()=>import('../function/app-drawer'))

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawerOpen: false
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }
  handleDrawerToggle(){
    this.setState((state) => ({
      isDrawerOpen: !state.isDrawerOpen
    }))
  }
  render() {
    return (
      <>
        <AppBar 
          position='sticky' 
          color='default'
          elevation={ 0 }
          className={ this.props.className }>
          <Toolbar>
              <AppBrand toggleDrawer={ this.handleDrawerToggle }/>
          </Toolbar>
        </AppBar>
        <AppDrawer isDrawerOpen={ this.state.isDrawerOpen }/>
      </>
    )
  }
}

export default NavBar
