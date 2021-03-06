import React, { Component, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'

const RepositoryList = lazy(()=>import('../function/repositories/repository-list'))
const AppPagination = lazy(()=>import('../function/app-pagination'))
const parseLinkHeader = require('parse-link-header')

export default class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      githubApiRepositoriesUrl: 'https://api.github.com/users/' + props.match.params.username 
        + '/repos?page=' + props.match.params.page +'&per_page=16',
      repositories: [],
      isLoaded: false,
      error: null,
      pagination: null
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  componentDidMount() {
    if(this.isLocalStorageValid()){
      this.fetchDataFromApi()
    } else {
      this.fetchDataFromApi()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state){
      this.saveDataToLocalStorage()
    } else {
      this.loadDataFromLocalStorage()
    }
  }

  fetchDataFromApi() {
    fetch(this.state.githubApiRepositoriesUrl,{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          pagination: parseLinkHeader(response.headers.get('link'))
        })
      )
    ).then(
      result => {
        this.setState({
          isLoaded: true,
          repositories: result
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
    localStorage.setItem('repos',JSON.stringify(this.state))
    localStorage.setItem('reposTime',new Date())
  }

  loadDataFromLocalStorage() {
    this.setState(JSON.parse(localStorage.getItem('repos')))
  }

  isLocalStorageValid () {
    const localStorageTimeOutInHours = Math.abs(
      new Date() - new Date(localStorage.getItem('reposTime'))
    ) / (1000 * 60 * 60)
    return localStorageTimeOutInHours < 2
  }

  handlePaginationChange(){
    this.setState((state, props) => ({
      githubApiRepositoriesUrl: 'https://api.github.com/users/' + props.match.params.username 
        + '/repos?page=' + props.match.params.page + '&per_page=16'
    }), () => this.fetchDataFromApi())
  }

  render() {
    const { error, isLoaded, repositories, pagination } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <LinearProgress />
    } else {
      return (
        <Box mx='auto' width='95%'>
          <Grid container justify='flex-start'>
            <Box my={2} ml={10}>
              <Typography variant='h4'>
                { this.props.match.params.username } repositories
              </Typography>
            </Box>
          </Grid>
          <RepositoryList repos={ repositories }/>
          <Grid container justify='center'>
            <Box my={3} mr={10}>
            <AppPagination 
              username={ this.props.match.params.username }
              pagination={ pagination }
              changeHandler={ this.handlePaginationChange }
            />
            </Box>
          </Grid>
        </Box>
      )
    }  
  }
}
