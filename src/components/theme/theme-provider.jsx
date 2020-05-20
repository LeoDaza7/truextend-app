import React, { useState } from 'react'
import  ThemeContext from './theme-context'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

function ThemeProvider(props) {

  const [darkMode, setDarkMode] = useState(false)

  const handleToggleTheme = () => {
    setDarkMode(!darkMode)
  }

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
