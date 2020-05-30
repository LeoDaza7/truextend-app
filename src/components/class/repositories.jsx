import React, { Component, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'

const RepositoryList = lazy(()=>import('../function/repository-list'))
const AppPagination = lazy(()=>import('../function/app-pagination'))
const parseLinkHeader = require('parse-link-header')

export default class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: 'https://api.github.com/users/' + props.match.params.username +'/repos?page='+ props.match.params.page +'&per_page=16',
      repositories: [],
      isLoaded: false,
      error: null,
      pagination: null
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    window.scrollTo(0, 0)
    fetch(this.state.url,{mode: 'cors'}).then(
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
    if(prevState.repositories !== this.state.repositories){
      localStorage.setItem('repos',JSON.stringify(this.state.repositories))
    } else {
      this.setState({
        repositories: JSON.parse(localStorage.getItem('repos')),
        isLoaded: true
      })
    }
  }

  handlePaginationChange(){
    this.setState((state, props) => ({
      url: 'https://api.github.com/users/' + props.match.params.username +'/repos?page='+ props.match.params.page +'&per_page=16'
    }), () => this.fetchData())
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
