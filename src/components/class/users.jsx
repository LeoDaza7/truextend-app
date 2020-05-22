import React, { Component, lazy } from 'react'
import { Typography } from '@material-ui/core'

const UserList = lazy(()=>import('../function/user-list'))
const AppButton = lazy(()=>import('../function/app-button'))
const parseLinkHeader = require('parse-link-header')

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url:'https://api.github.com/users?page=1&per_page=4',
      isLoaded: false,
      error: null,
      users: [],
      pagination: null
    }
    this.handleNext = this.handleNext.bind(this)
  }

  fetchData(){
    fetch(this.state.url,{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          pagination: parseLinkHeader(response.headers.get('link'))
        })
      )
    ).then(
      result => {
        this.setState((state) => ({
          isLoaded: true,
          users: result,
          url: state.pagination.next.url
        }))
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchData()
  }

  handleNext() {
    window.scrollTo(0, 0)
    this.fetchData()
  }

  render() {
    const { error, isLoaded, users } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <>
          <Typography variant='h4'>GitHub Users</Typography>
          <UserList users={ users }/>
          <AppButton onClick={ this.handleNext }>next page</AppButton>
        </>
      )
    }  
  }
}
