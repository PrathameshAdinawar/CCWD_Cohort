import * as React from "react"

export interface FreeApiGetRandomUserResponse {
    statusCode: number;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        previousPage: boolean;
        nextPage: boolean;
        totalItems: number;
        currentPageItems: number;
        data: {
            gender: string;
            name: {
                title: string;
                first: string;
                last: string;
            };
            location: {
                street: {
                    number: number;
                    name: string;
                };
                city: string;
                state: string;
                country: string;
                postcode: number | string;
                coordinates: {
                    latitude: string;
                    longitude: string;
                };
                timezone: {
                    offset: string;
                    description: string;
                };
            };
            email: string;
            login: {
                uuid: string;
                username: string;
                password: string;
                salt: string;
                md5: string;
                sha1: string;
                sha256: string;
            };
            dob: {
                date: string;
                age: number;
            };
            registered: {
                date: string;
                age: number;
            };
            phone: string;
            cell: string;
            id: number;
            picture: {
                large: string;
                medium: string;
                thumbnail: string;
            };
            nat: string;
        }[];
    };
    message: string;
    success: boolean;
}
export function useRandomUser() {
    const [user, setUser] = React.useState<
        null | FreeApiGetRandomUserResponse['data']
    >();

    async function fetchRandomUsers() {
        const rawResponse = await fetch('https://api.freeapi.app/api/v1/public/randomusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await rawResponse.json() as FreeApiGetRandomUserResponse
        if (response.data && response.success) {
            setUser(response.data)
        }

    }

    return {
        user,
        fetchRandomUsers
    }
}