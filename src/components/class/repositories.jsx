import React, { Component, lazy } from 'react'

const RepositoryList = lazy(()=>import('../function/repository-list'))
const AppPagination = lazy(()=>import('../function/app-pagination'))
const parse = require('parse-link-header')

export default class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: 'https://api.github.com/users/' + props.match.params.username +'/repos?page='+ props.match.params.page +'&per_page=8',
      repositories: [],
      isLoaded: false,
      error: null,
      pagination: null
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  fetchData() {
    fetch(this.state.url,{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          pagination: parse(response.headers.get('link'))
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

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchData()
  }

  handlePaginationChange(){
    window.scrollTo(0, 0)
    this.setState((state, props) => ({
      url: 'https://api.github.com/users/' + props.match.params.username +'/repos?page='+ props.match.params.page +'&per_page=8'
    }),()=>{
      this.fetchData()
    })
  }

  render() {
    const { error, isLoaded, repositories, pagination } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <>
          <RepositoryList repos={ repositories }/>
          <AppPagination 
            username={ this.props.match.params.username }
            pagination={ pagination }
            changeHandler={ this.handlePaginationChange }
          />
        </>
      )
    }  
  }
}
