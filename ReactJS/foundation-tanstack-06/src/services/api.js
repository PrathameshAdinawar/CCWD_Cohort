import axios from 'axios'
import { tokenStore } from './tokenStore.js'

// Vite is imp yes Vite wants branding 
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

//api axio config
export const api = axios.create({

    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },

})

api.interceptors.request.use((config) => {
    const token = tokenStore.getAccess()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

api.interceptors.response.use((response) =>
    response,
    async (errror) => {
        if (error.response?.status === 401) {
            //
        }
    }
)