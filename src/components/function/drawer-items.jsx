import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PeopleIcon from '@material-ui/icons/People'
import { Link } from 'react-router-dom'

export default function DrawerItems(props){
  const items = [
    { component: 'Users', route: '/users', icon: <PeopleIcon /> }
  ]

  const itemList = items.map((item) => (
    <ListItem 
      button
      key={ item.component } 
      component={ Link } 
      to={ item.route }>
        <ListItemIcon>
          { item.icon }
        </ListItemIcon>
        <ListItemText primary={ item.component } />
    </ListItem>
  ))

  return (
    <List>{ itemList }</List>
  )
}
