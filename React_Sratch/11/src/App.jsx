import { useState } from 'react'
import './App.css'
import { BrokenCup } from './BrokenCup'
import { ErrorBoundary } from './ErrorBoundary.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chai aur React</h1>
      <ErrorBoundary>
        <BrokenCup />
      </ErrorBoundary>

    </>
  )
}

export default App
