const express = require("express");

function block_1_basicServer() {
    return Promise((resolve) => {
        const app = express()

        app.use(express.json())

        app.get('/menu', (req, res) => {
            // res.json has two major work to make 
            // 1. ContentType:JSON 
            // 2. Seriaize the data response
            res.json({
                items: [
                    'thali',
                    'biryani'
                ]
            })
        })


        //Query parameters
        app.get('/search', (req, res) => {
            // these are query params/parameters what ever comes after ? is QueryParams
            // chaiaurcode.com/search?q=biryani&limit=5
            const { q, limit } = req.body
            res.json({
                query: q,
                limit: limit || '10'
            })
        })

        // Route/Path Parameters
        app.get('/menu/:id', (req, res) => {
            const { id } = req.params
            res.json({
                item: id,
                price: 149
            })
        })

        // Its Input data as JSON 
        app.post('/order', (req, res) => {
            const order = req.body
            res.status(201).json({
                status: 'created',
                order
            })
        })


        // 0 just assignes a free port   
        const server = app.listen(0, async () => {

            const port = server.address().port
            const base = `127.0.0.1:${port}`

            try {
                const menuResponse = await fetch(`${base}/menu`)
                const menuData = menuResponse.json()
                console.log('GET/menu', JSON.stringify(menuData))
            } catch (error) {

            }
        })

    })
}

async function main() {
    await block_1_basicServer()

    process.exit(0)
}

main()