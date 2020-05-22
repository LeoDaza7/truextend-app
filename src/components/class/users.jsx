import React, { Component, lazy } from 'react'

const UserList = lazy(()=>import('../function/user-list'))
const AppPagination = lazy(()=>import('../function/app-pagination'))

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoaded: false,
      error: null,
      paginationLink: null
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users?page=1&per_page=4',{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          paginationLink: response.headers.get('link')
        })
      )
    ).then(
      result => {
        this.setState({
          isLoaded: true,
          users: result
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
    const { error, isLoaded, users, paginationLink } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <>
          <UserList users={ users }/>
          <AppPagination link={ paginationLink }/>
        </>
      )
    }  
  }
}
