import React, { Component, lazy } from 'react'

const RepositoryList = lazy(()=>import('../function/repository-list'))

export default class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositories: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users/'+ this.props.match.params.username +'/repos?page=1&per_page=100').then(
      response => response.json()
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
    const { error, isLoaded, repositories } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return <RepositoryList repos={ repositories }/>
    }  
  }
}
