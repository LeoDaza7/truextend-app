import React, { lazy } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const RepositoryCard = lazy(()=>import('./repository-card'))

export default function RepositoryList(props) {
  const classes = useStyles()
  const repositories = props.repos.map(repo => (
    <Grid item align='center' xs={12} sm={6} md={4} lg={3} key={ repo.id }>
      <RepositoryCard
        name={ repo.name }
        description={ repo.description }
        githubPage={ repo.html_url }
        issues={ repo.has_issues ? 'Yes' : 'No' }
        openIssues={ repo.open_issues_count}
        forks= { repo.forks_count }
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
      { repositories }
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  //custom styles
}))
