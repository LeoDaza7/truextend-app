import React, { lazy } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import GitHubIcon from '@material-ui/icons/GitHub'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const AppIconButton = lazy(()=>import('./app-icon-button'))
const AppButton = lazy(()=>import('./app-button'))

export default function UserCard(props) {
  const classes = useStyles()
  return (
    <Card className={ classes.card }>
      <CardActionArea>
        <CardMedia 
          className={ classes.cardMedia }
          image={ props.avatarUrl }
          tile={ props.login }/>
        <CardContent>
          <Typography variant='h5'>
            { props.login }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid
          container
          justify='space-between'
          alignItems='center'>
          <AppIconButton href={ props.githubPage } target='_blank'>
            <GitHubIcon/>
          </AppIconButton>
          <AppButton component={Link} to={`/repos/user=${ props.login }/page=1`}>
            <Typography className={classes.button}>See repositories..</Typography>
          </AppButton>
        </Grid>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 280,
    backgroundColor: theme.palette.background.default
  },
  button: {
    textTransform: 'none',
    fontWeight: '420'
  },
  cardMedia: {
    height: 210
  },
}))
