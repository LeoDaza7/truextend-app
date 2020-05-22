import React, { Component, lazy } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'

const AppBrand = lazy(()=>import('../function/app-brand'))
const SearchBox = lazy(()=>import('../function/search-box'))
const ToggleTheme = lazy(()=>import('../function/toggle-theme'))
const AppDrawer = lazy(()=>import('../function/app-drawer'))

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawerOpen: false,
      searchBoxValue: ''
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }
  handleDrawerToggle(){
    this.setState((state) => ({
      isDrawerOpen: !state.isDrawerOpen
    }))
  }
  handleDrawerClose(){
    this.setState({
      isDrawerOpen: false
    })
  }
  handleSearchSubmit (event) {
    event.preventDefault()
    alert('TODO: search method - Value: ' + this.state.searchBoxValue)
    console.log(event.target.elements.searchInputId.value)
  }
  handleSearchChange (event) {
    this.setState({
      searchBoxValue: event.target.value
    })
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
            <Box ml={1}>
              <AppBrand toggleDrawer={ this.handleDrawerToggle }/>
            </Box>
            <SearchBox
              searchValue={ this.state.searchBoxValue }
              submitHandler={ this.handleSearchSubmit }
              changeHandler={ this.handleSearchChange }
            />
            <Box mr={10}>
              <ToggleTheme />
            </Box>
          </Toolbar>
        </AppBar>
        <AppDrawer isDrawerOpen={ this.state.isDrawerOpen } handleClose={this.handleDrawerClose}/>
      </>
    )
  }
}

export default NavBar
