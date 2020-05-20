import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core'

export default function AppIconButton(props) {
  const classes = useStyles()
  return (
    <IconButton
      edge='start'
      color='inherit'
      className={ classes[props.className] }
      onClick={ props.onClick }>
      { props.children }
    </IconButton>
  )
}

const useStyles = makeStyles((theme)=>({
  //custom styles
}))
