import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const AppBar = lazy(()=>import('../class/app-bar'))
const Home = lazy(()=>import('../class/home'))
const Users = lazy(()=>import('../class/users'))
const Repositories = lazy(()=>import('../class/repositories'))
const ErrorBoundary = lazy(()=>import('../class/error-boundary'))

export default function AppRouter(props) {
  return (
    <Router>
      <ErrorBoundary>
        <AppBar className={ props.classes.appBar }/>
      </ErrorBoundary>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/' component={Home}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/repos/user=:username/page=:page' component={Repositories}/>
        </ErrorBoundary>
      </Switch>
    </Router>
  )
}


