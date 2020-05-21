import React, { lazy } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import GitHubIcon from '@material-ui/icons/GitHub'
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
        <AppIconButton href={ props.githubPage } target='_blank'>
          <GitHubIcon/>
        </AppIconButton>
        <Link to={`/repos/user/${ props.login }`}>
          <AppButton>Repos</AppButton>
        </Link>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  card: {
    maxWidth: 280
  },
  cardMedia: {
    height: 210
  },
})
