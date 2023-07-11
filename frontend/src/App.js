
import { useState } from 'react'
import Router from './router/Router'
import ToggleSBContext from './context/ToggleSBContext';
import Router from './router/Router'

const App = () => {
  const [toggle, setToggle] = useState(false)

  const input = { toggle, setToggle }
  return (
    <ToggleSBContext.Provider value={input}>
      <Router />
    </ToggleSBContext.Provider>
  )
}

export default App
