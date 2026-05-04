import './App.css';

const shows = [
    {
        id: 1,
        title: "The Matrix",
        time: "10:00 AM",
        hall: "Screen 1"
    },
    {
        id: 2,
        title: "Inception",
        time: "01:30 PM",
        hall: "Screen 2"
    },
    {
        id: 3,
        title: "Interstellar",
        time: "04:45 PM",
        hall: "Screen 1"
    },
    {
        id: 4,
        title: "Dune: Part Two",
        time: "08:00 PM",
        hall: "IMAX"
    },
    {
        id: 5,
        title: "Everything Everywhere All at Once",
        time: "10:15 PM",
        hall: "Screen 3"
    }
];

function App() {

    // In return it only takes one tag use <></> or <div><div/>
    return (
        <>

            { /* To add the JS we use { } */}
            <h1>Hello  React</h1>

            {/* we can use "forEach" if we dont want to break; other wise use "map" */}
            <section className="grid">

                {shows.map((show) => (

                    <article>

                        <p className="tag">{show.hall}</p>
                        <h3>{show.title}</h3>
                        <p className="muted">{show.time}</p>

                    </article>

                ))}

            </section>

        </>
    )
}

export default App;