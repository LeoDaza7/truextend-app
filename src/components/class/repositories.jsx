import React, { Component, lazy } from 'react'

const RepositoryList = lazy(()=>import('../function/repository-list'))
const AppPagination = lazy(()=>import('../function/app-pagination'))

export default class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositories: [],
      isLoaded: false,
      error: null,
      paginationLink: null
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users/'+ this.props.match.params.username +'/repos?page=1&per_page=10').then(
      response => response.json(
        this.setState({
          paginationLink: response.headers.get('link')
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

  render() {
    const { error, isLoaded, repositories, paginationLink } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <>
          <RepositoryList repos={ repositories }/>
          <AppPagination link={ paginationLink }/>
        </>
      )
    }  
  }
}
