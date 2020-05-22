import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

export default function AppButton(props) {
  const classes = useStyles()
  return (
    <Button 
      color='inherit'
      component={props.component}
      to={props.to}
      className={ classes[props.className] }
      href={ props.href }
      target={ props.target }
      onClick={ props.onClick }>
      { props.children }
    </Button>
  )
}

const useStyles = makeStyles((theme)=>({
  //custom styles
}))
