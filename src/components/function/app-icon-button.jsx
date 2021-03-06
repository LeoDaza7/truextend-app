import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core'

export default function AppIconButton(props) {
  const classes = useStyles()
  return (
    <IconButton
      color='inherit'
      edge={ props.edge }
      className={ classes[props.className] }
      href={ props.href }
      target={ props.target }
      onClick={ props.onClick }>
      { props.children }
    </IconButton>
  )
}

const useStyles = makeStyles((theme)=>({
  //custom styles
}))
