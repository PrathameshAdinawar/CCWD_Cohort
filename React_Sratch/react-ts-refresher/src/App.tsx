import { useState } from 'react'
import { useRandomUser } from './hooks/use-Random-user'

import './App.css'

function App() {


  // const [count, setCount] = useState(0)
  // Inner working of useState: here useState() has two things in array[] 
  // state [0]. is variable which stores value
  // state [1] is function that can perform operation on state[0] variable 
  const state = useState(0)
  console.log(state)

  function handleStatePlus() {
    state[1](state[0] + 1)
  }

  function handleStateMinus() {
    state[1](state[0] - 1)
  }

  /* Component life cycle in react
   Create component in VDOM -> Mount component in DOM -> Update the state -> detroy the old state -> Create component in VDOM 
   which runs whenever a hook is used 
   */

  // Custom Hook
  const { user, fetchRandomUsers } = useRandomUser();

  return (
    <div>
      <h1>useState breakdown</h1>
      <button onClick={() => handleStatePlus()}>Increment</button>
      <h1>Count is {state[0]}</h1>
      <button onClick={() => handleStateMinus()}>Decrement</button>


      <div>

        <button onClick={fetchRandomUsers}>fetch user</button>

        {user ? (
          <h1>
            {user.} {user.name.last}
          </h1>
        ) : "No user found"}
      </div>
    </div>
  )
}

export default App
