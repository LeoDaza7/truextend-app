import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const AppBar = lazy(()=>import('../class/app-bar'))
const Home = lazy(()=>import('../class/home'))
const Users = lazy(()=>import('../class/users'))
const Repositories = lazy(()=>import('../class/repositories'))

export default function AppRouter(props) {
  return (
    <Router>
      <AppBar className={ props.classes.appBar }/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={Users}/>
        <Route exact path='/repos/user=:username/page=:page' component={Repositories}/>
      </Switch>
    </Router>
  )
}


