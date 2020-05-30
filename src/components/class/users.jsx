import React, { Component, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'

const UserList = lazy(()=>import('../function/user-list'))
const AppButton = lazy(()=>import('../function/app-button'))
const parseLinkHeader = require('parse-link-header')

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'https://api.github.com/users?page=1&per_page=16&since=0',
      isLoaded: false,
      error: null,
      users: [],
      pagination: null
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(){
    window.scrollTo(0, 0)
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
          users: result
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

  handlePaginationChange(){
    console.log(this.state.pagination)
    this.setState((state, props) => ({
      url: 'https://api.github.com/users?page=1&per_page=16&since=' + state.pagination.next.since
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
              <AppButton onClick={ this.handlePaginationChange }>next page</AppButton>
            </Box>
          </Grid>
        </Box>
      )
    }  
  }
}