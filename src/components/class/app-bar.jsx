import React, { Component, lazy } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

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
  }
  handleDrawerToggle(){
    this.setState((state) => ({
      isDrawerOpen: !state.isDrawerOpen
    }))
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
            <AppBrand toggleDrawer={ this.handleDrawerToggle }/>
            <SearchBox
              searchValue={ this.state.searchBoxValue }
              submitHandler={ this.handleSearchSubmit }
              changeHandler={ this.handleSearchChange }
            />
            <ToggleTheme />
          </Toolbar>
        </AppBar>
        <AppDrawer isDrawerOpen={ this.state.isDrawerOpen }/>
      </>
    )
  }
}

export default NavBar
