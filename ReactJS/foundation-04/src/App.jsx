import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [seconds, setSeconds] = useState(10);

  // Three things in useEffect callback fn ()=>{}, dependencies [] and optional return() =>{ "clean up" }
  // runs on component mount/loads not when page loads 
  // and runs on depends on dependency array []
  // In dependency array [] there are variables if they change useEffect triggers/runs  
  // useEffect(() => {

  //   return () => {
  //cleanup
  //   }

  // }, [])

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) =>
        Math.max(current - 1, 0)
      )
    }, 1000)

    return () => {
      //clean up
      clearInterval(timerId);
    }
  }, [])

  const addData = () => {
    setPosts([
      ...posts,
      'hitesh ',
      'chaicode '
    ])
    console.log(posts)
  }

  return (
    <section>
      <h1>useEffect Hook</h1>
      <p>what is hook: nothing but function in react</p>

      <h2>{seconds}</h2>
    </section>
  )
}

export default App
