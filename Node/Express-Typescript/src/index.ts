import http from 'http'
import { env } from './env.js'
import { createAServerApplication } from './app/index.js';

async function main() {
    try {

        const server = http.createServer(createAServerApplication());

        // + here is to parse it to number 
        // but still there is no runtime validation 
        const PORT: number = env.PORT ? +env.PORT : 8080

        server.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`)
        })

    } catch (e) {
        throw e
    }
}

main()