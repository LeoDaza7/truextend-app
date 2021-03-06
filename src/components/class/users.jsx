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
    if(this.isLocalStorageValid()){
      this.loadDataFromLocalStorage()
    } else {
      this.fetchDataFromApi()
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {
      this.saveDataToLocalStorage()
    } else {
      this.loadDataFromLocalStorage()
    }
  }

  fetchDataFromApi(){
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

  saveDataToLocalStorage() {
    localStorage.setItem('users',JSON.stringify(this.state))
    localStorage.setItem('usersTime',new Date())
  }

  loadDataFromLocalStorage() {
    this.setState(JSON.parse(localStorage.getItem('users')))
  }

  isLocalStorageValid () {
    const localStorageTimeOutInHours = Math.abs(
      new Date() - new Date(localStorage.getItem('usersTime'))
    ) / (1000 * 60 * 60)
    return localStorageTimeOutInHours < 2
  }

  handlePaginationChange(){
    this.setState((state, props) => ({
      githubApiUsersUrl: 'https://api.github.com/users?page=1&per_page=16&since=' 
        + state.pagination.next.since
    }), () => this.fetchDataFromApi())
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
                Next page
              </AppButton>
            </Box>
          </Grid>
        </Box>
      )
    }  
  }
}
