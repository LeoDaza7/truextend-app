import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const AppBar = lazy(()=>import('../class/app-bar'))
const Home = lazy(()=>import('../class/home'))
const Users = lazy(()=>import('../class/users'))

export default function AppRouter(props) {
  return (
    <Router>
      <AppBar className={ props.classes.appBar }/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={Users}/>
      </Switch>
    </Router>
  )
}


