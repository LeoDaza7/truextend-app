import React from 'react'
import ThemeProvider from './theme-provider'

export default function ContextProvider(props) {
  return (
    <ThemeProvider>
      { props.children }
    </ThemeProvider>
  )
}
