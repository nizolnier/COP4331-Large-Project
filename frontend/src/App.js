import { useState } from 'react'
import Router from './router/Router'
import ToggleSBContext from './context/ToggleSBContext';

// React Query setup
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  const [toggle, setToggle] = useState(false)

  const input = { toggle, setToggle }
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleSBContext.Provider value={input}>
        <Router />
      </ToggleSBContext.Provider>
    </QueryClientProvider>
  )
}

export default App
