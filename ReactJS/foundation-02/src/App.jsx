
import './App.css'
import AvatarCard from './components/AvatarCard.jsx'

const avatars = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Leader",
    power: "Telepathy",
    initials: "AJ"
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Tank",
    power: "Super Strength",
    initials: "BS"
  },
  {
    id: 3,
    name: "Charlie Davis",
    role: "Healer",
    power: "Regeneration",
    initials: "CD"
  }
]


//we can use props or specific object that is required 
// children here is "anything you say" it will dump it anywhere needed 
function Shell({ title, children }) {

  // because it is an jsx file we can return <html>/xml 
  return (
    <section>

      <h1>Children in react</h1>

      <p>Reusable shell</p>
      <h2>{title}</h2>
      {children}

    </section>
  )

}




function App() {


  return (
    <>

      <h1>Hello from chaicode</h1>

      {/* This is an example that if written like this it will still work but not the way to use it */}
      {/* <Shell title='Batman' children={'Test children'} /> */}

      {/* Its a good practise to use write the html in one tag only <div></div> */}
      <Shell title='Batman'>
        <div>
          <h2>This is inside shell</h2>
          <p>Shell Shell</p>
        </div>
      </Shell>

      <section>

        {
          avatars.map((avatar) => (



            /* similar to calling a function using () react gives a way to call it use "key = {value}" */
            <AvatarCard
              level={avatar.id === 1 ? 'captian' : undefined}
              avatar={avatar} />

          ))
        }

      </section>

    </>
  )
}

export default App
