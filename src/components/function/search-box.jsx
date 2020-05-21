import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'

export default function SearchBox(props) {
  return (
    <Paper
      component='form'
      className='mx-auto'
      variant='outlined'
      onSubmit={ props.submitHandler }>
      <IconButton type='submit' className=''>
        <SearchIcon />
      </IconButton>
      <InputBase
        id='searchInputId'
        name='searchInputName'
        className='searchInputClassName'
        placeholder='Search..'
        type='text'
        value={ props.searchValue }
        onChange={ props.changeHandler }/>
    </Paper>
  )
}
