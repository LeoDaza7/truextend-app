import React, { Component, lazy } from 'react'

const UserList = lazy(()=>import('../function/user-list'))

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users?page=1&per_page=4').then(
      response => response.json()
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
    const { error, isLoaded, users } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return <UserList users={ users }/>
    }  
  }
}
