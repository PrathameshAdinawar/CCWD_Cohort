import { useState, useEffect } from "react";

export function ChaiMenu() {

    const [menu, setMenu] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data) // log it here while u have it 
                setMenu(data)
            })
            // .then((data) => console.log(data)) * This line doesn't work because the data is now consumed by the setMenu() and is now undefined *
            .catch((error) => console.error(`Error fetching data : ${error}`));

    }, [])

    return (
        <>
            <h1>Chai Menu</h1>
            <p>Data from /api/all-chai {menu ? menu.map((item) => <li key={item.id}>{item.name}</li>) : "Loading..."} </p>
            // key plays a good role in helping react identify which items have changed, are added, or are removed.
        // It should be a unique identifier for each item in the list. In this case, we are using item.id as the key, assuming that each chai item has a unique id property.
        // This also helps in animations and efficient renders the elements.
        </>
    )
}