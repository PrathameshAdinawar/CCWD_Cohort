import { useState } from 'react'
import ManualForm from './ManualForm'
import HookForm from './HookForm'
import './App.css'

function App() {
  const [tab, setTab] = useState('manual')

  return (
    <div>

      <div className="shell">
        <h1>Job application</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum corporis nulla aliquam.</p>

      </div>

      <div className="tab">
        <button onClick={() => setTab('manual')}>Controlled-Manual</button>
        <button onClick={() => setTab('RHF')}>React hook form</button>

      </div>

      <h1>Gitting started with React</h1>
      {tab === 'manual' ? <ManualForm /> : <HookForm />}
    </div>
  )
}

export default App
