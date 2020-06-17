import React, { Component, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'

const UserList = lazy(()=>import('../function/users/user-list'))
const AppButton = lazy(()=>import('../function/app-button'))
const parseLinkHeader = require('parse-link-header')

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      githubApiUsersUrl: 'https://api.github.com/users?page=1&per_page=16&since=0',
      isLoaded: false,
      error: null,
      users: [],
      pagination: null
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  componentDidMount() {
    if(this.isLocalStorageIsValid()){
      this.setState(JSON.parse(localStorage.getItem('users')))
    } else {
      this.fetchData()
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {
      localStorage.setItem('users',JSON.stringify(this.state))
      localStorage.setItem('usersTime',new Date())
    } else {
      this.setState(JSON.parse(localStorage.getItem('users')))
    }
  }

  fetchData(){
    fetch(this.state.githubApiUsersUrl,{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          pagination: parseLinkHeader(response.headers.get('link'))
        })
      )
    ).then(
      result => {
        this.setState({
          isLoaded: true,
          users: result
        })
        window.scrollTo(0, 0)
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  isLocalStorageIsValid () {
    const localStorageTimeOutInHours = Math.abs(
      new Date() - new Date(localStorage.getItem('usersTime'))
    ) / (1000 * 60 * 60)
    if(localStorageTimeOutInHours < 2){
      return true
    } else {
      return false
    }
  }

  handlePaginationChange(){
    this.setState((state, props) => ({
      githubApiUsersUrl: 'https://api.github.com/users?page=1&per_page=16&since=' 
        + state.pagination.next.since
    }), () => this.fetchData())
  }

  render() {
    const { error, isLoaded, users } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <LinearProgress />
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
              <AppButton
                onClick={ this.handlePaginationChange }>
                next page
              </AppButton>
            </Box>
          </Grid>
        </Box>
      )
    }  
  }
}
