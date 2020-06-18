import React, { lazy } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GitHubIcon from '@material-ui/icons/GitHub'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const AppIconButton = lazy(()=>import('../app-icon-button'))

export default function UserCard(props) {
  const classes = useStyles()
  return (
    <Card className={ classes.card }>
      <CardActionArea>
        <CardContent>
          <Typography variant='h5'>
            { props.name }
          </Typography>
          <AppIconButton href={ props.githubPage } target='_blank'>
              <GitHubIcon/>
          </AppIconButton>
          <Grid container
            justify='space-around'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='subtitle1'>
                Issues
              </Typography>
              <Typography variant='body1'>
                { props.issues }
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                Open Issues
              </Typography>
              <Typography variant='body1'>
                { props.openIssues }
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                Forks
              </Typography>
              <Typography variant='body1'>
                { props.forks }
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant='subtitle2'>
          { props.details }
        </Typography>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 350,
    backgroundColor: theme.palette.background.default
  },
  cardMedia: {
    height: 140
  },
}))
