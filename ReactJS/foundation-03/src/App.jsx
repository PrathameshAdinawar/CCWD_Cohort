import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let value = 5;

  const increase = () => {
    value++;
    console.log(value)
  }

  return (
    <div>
      <h1>Value: {value}</h1>
      <button onClick={increase}>✅</button>
    </div>
  )
}

export default App
