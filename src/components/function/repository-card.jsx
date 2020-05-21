import React, { lazy } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/core/styles'

const AppIconButton = lazy(()=>import('./app-icon-button'))

export default function UserCard(props) {
  const classes = useStyles()
  return (
    <Card className={ classes.card }>
      <CardActionArea>
        <CardContent>
          <Typography variant='h5'>
            { props.name }
          </Typography>
          <Typography variant='h6'>
            Issues: { props.issues }
          </Typography>
          <Typography variant='h6'>
            OpenIssues: { props.openIssues }
          </Typography>
          <Typography variant='h6'>
            Forks: { props.forks }
          </Typography>
          <Typography variant='h6'>
            Details: { props.details }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AppIconButton href={ props.githubPage } target='_blank'>
          <GitHubIcon/>
        </AppIconButton>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  card: {
    maxWidth: 350
  },
  cardMedia: {
    height: 140
  },
})
