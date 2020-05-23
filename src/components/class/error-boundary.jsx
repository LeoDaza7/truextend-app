import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error
    }
  }

  componentDidCatch(error,errorInfo){
    this.setState({
      errorInfo: errorInfo
    },()=>{
      console.log(this.state.error, this.state.errorInfo)
      console.log('Error did catch!')
    })
  }

  render() {
      if (this.state.hasError) {
        return <h1>Oops! Something went wrong!</h1>
      }
      return this.props.children
  }
}
