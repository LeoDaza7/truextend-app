import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = lazy(()=>import('../class/home'))
const Users = lazy(()=>import('../class/users'))

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={Users}/>
      </Switch>
    </Router>
  )
}
