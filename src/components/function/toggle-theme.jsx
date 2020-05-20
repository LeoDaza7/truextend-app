import React, { useContext, lazy } from 'react'
import ThemeContext from '../theme/theme-context'
import InvertColorsIcon from '@material-ui/icons/InvertColors'

const AppIconButton = lazy(()=>import('./app-icon-button'))

export default function ToggleTheme(props) {

  const { toggleTheme } = useContext(ThemeContext)

  return (
    <AppIconButton
      classs='toggleTheme'
      onClick={toggleTheme}>
      <InvertColorsIcon />
    </AppIconButton>
  )
}
