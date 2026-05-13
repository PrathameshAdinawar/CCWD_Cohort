import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ChaiMenu } from './ChaiMenu'
import { useSpecialChai } from './hooks/useSpecialChai'

function App() {
  const [data, setData] = useState(null)
  console.log(`${import.meta.env.VITE_API_URL}`);

  //custom hook
  const [chai, loading, error] = useSpecialChai();


  // *** additional fact/knowledge ***
  // setcount(data +1); setcount(data +1); Such code can be send in batches act as one so only + 1 will work not + 2
  // setcpunt(()=> data + 1); setcount(() => data + 1); Such code will work as we are sending two different functions so
  //  they will be executed separately and we will get + 2


  useEffect(() => {
    //Effect logic here
    fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data) // log it here while u have it 
        setData(data)
      })
      // .then((data) => console.log(data)) * This line doesn't work because the data is now consumed by the setData() and is now undefined *
      .catch((error) => console.error(`Error fetching data : ${error}`));

  }, [])


  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <h1>Hello ji</h1>

      <p>Data from /api/all-chai {data ? JSON.stringify(data) : "Loading..."} </p>

      <ChaiMenu />

      <h1>Custom hook useSpecialChai</h1>
      <p>{chai ? JSON.stringify(chai) : 'Loading...'}</p>
    </>
  )
}

export default App
