import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'

class NavBar extends Component {
  render() {
    return (
      <AppBar 
        position='sticky' 
        color='default'
        elevation={ 0 }>
      </AppBar>
    )
  }
}

export default NavBar
