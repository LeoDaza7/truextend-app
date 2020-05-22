import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core'

export default function SearchBox(props) {
  const classes = useStyles()
  return (
    <Paper
      component='form'
      className={`mx-auto ${classes.paper}`}
      variant='outlined'
      onSubmit={ props.submitHandler }>
      <IconButton 
        className={classes.icon}
        type='submit'>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        id='searchInputId'
        name='searchInputName'
        placeholder='Search..'
        type='text'
        value={ props.searchValue }
        onChange={ props.changeHandler }/>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  //custom styles
  paper: {
    maxHeight: 35,
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  input:{
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  icon:{
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

