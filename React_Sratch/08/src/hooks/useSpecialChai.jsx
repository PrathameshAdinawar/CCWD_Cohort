import { useState, useEffect, use } from "react";

export function useSpecialChai() {
    const [chai, setChai] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                setChai(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })

    }, [])

    return [chai, loading, error]
}