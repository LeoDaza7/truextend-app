import React, { useState, useEffect } from 'react'
import  ThemeContext from './theme-context'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

function ThemeProvider(props) {

  const [darkMode, setDarkMode] = useState(false)

  const handleToggleTheme = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem('theme')))
  }, [])

  useEffect(() => {
    localStorage.setItem('theme',JSON.stringify(darkMode))
  },[darkMode])

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })

  const state = {
    isDarkMode: darkMode,
    toggleTheme: handleToggleTheme
  }


  return (
    <ThemeContext.Provider value={ state }>
      <MuiThemeProvider theme={ theme }>
        { props.children }
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
