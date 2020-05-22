import React, { Component, lazy } from 'react'

const UserList = lazy(()=>import('../function/user-list'))
const AppButton = lazy(()=>import('../function/app-button'))

export default class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url:'https://api.github.com/users?page=1&per_page=32',
      isLoaded: false,
      error: null,
      users: [],
      nextPageUrl: null
    }
    this.handleNext = this.handleNext.bind(this)
  }

  fetchData(){
    fetch(this.state.url,{mode: 'cors'}).then(
      response => response.json(
        this.setState({
          nextPageUrl: parseLink(response.headers.get('link')).next
        })
      )
    ).then(
      result => {
        this.setState((state) => ({
          isLoaded: true,
          users: result,
          url: state.nextPageUrl
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

  componentDidMount() {
    this.fetchData()
  }

  handleNext(){
    this.fetchData()
  }

  render() {
    const { error, isLoaded, users } = this.state
    if (error) {
      return <>Error: { error.message }</>
    } else if (!isLoaded){
      return <>Loading..</>
    } else {
      return (
        <>
          <UserList users={ users }/>
          <AppButton onClick={ this.handleNext }>next page</AppButton>
        </>
      )
    }  
  }
}

function parseLink(header) {
  //https://gist.github.com/niallo/3109252
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
}

  // Split parts by comma
  var parts = header.split(',');
  var links = {};
  // Parse each part into a named link
  for(var i=0; i<parts.length; i++) {
      var section = parts[i].split(';');
      if (section.length !== 2) {
          throw new Error("section could not be split on ';'");
      }
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
  }
  return links;
}


