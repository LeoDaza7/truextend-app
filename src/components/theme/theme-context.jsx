import { createContext } from 'react'

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: true
})

export default ThemeContext
