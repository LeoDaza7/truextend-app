import React, { Component, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const UserList = lazy(()=>import('../function/user-list'))
const AppButton = lazy(()=>import('../function/app-button'))
const parseLinkHeader = require('parse-link-header')

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url:'https://api.github.com/users?page=1&per_page=16',
      isLoaded: false,
      error: null,
      users: [],
      pagination: null
    }
    this.handleNext = this.handleNext.bind(this)
  }

  componentDidMount() {
    this.fetchData(
      window.scrollTo(0, 0)
    )
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
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.users !== this.state.users){
      localStorage.setItem('users',JSON.stringify(this.state.users))
    }else {
      this.setState({
        users: JSON.parse(localStorage.getItem('users')),
        isLoaded: true
      })
    }
  }

  handleNext() {
    this.fetchData(
      window.scrollTo(0, 0)
    )
  }

  render() {
    const { error, isLoaded, users } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <Box mx='auto' width='95%'>
          <Grid container justify='flex-start'>
            <Box my={2} ml={10}>
              <Typography variant='h4'>GitHub Users</Typography>
            </Box>
          </Grid>
          <UserList users={ users }/>
          <Grid container justify='flex-end'>
            <Box my={3} mr={10}>
              <AppButton onClick={ this.handleNext }>next page</AppButton>
            </Box>
          </Grid>
        </Box>
      )
    }  
  }
}
