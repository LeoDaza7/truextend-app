import React, { lazy } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const UserCard = lazy(()=>import('./user-card'))

export default function UserList(props) {
  const classes = useStyles()
  const users = props.users.map(user => (
    <Grid item align='center' xs={12} sm={6} md={4} lg={3} key={ user.id }>
      <UserCard
        key={ user.id }
        login={ user.login }
        avatarUrl={ user.avatar_url }
        githubPage={ user.html_url }
        reposUrl={ user.repos_url }
      />
    </Grid>
  ))
  return (
    <Grid
      container
      className={classes.grid}
      justify='center'
      alignItems='center'
      spacing={2}>
      { users }
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  //custom styles
}))
