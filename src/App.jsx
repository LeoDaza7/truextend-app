import React from 'react'
import Layout from './components/function/layout'
import ContextProvider from './components/theme/context-provider'

function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  )
}

export default App
