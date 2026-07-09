const express = require("express");

function block_1_basicServer() {
    return new Promise((resolve) => {
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
            const { q, limit } = req.query
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
            const base = `http://127.0.0.1:${port}`

            try {
                // menu
                const menuResponse = await fetch(`${base}/menu`)
                const menuData = await menuResponse.json()

                console.log('GET/menu', JSON.stringify(menuData))
                console.log("+++++++++++++++++++++++++++++++++++")

                // search
                const searchRes = await fetch(`${base}/search?q=biryani&limit=5&page=3`)
                const searchData = await searchRes.json()

                console.log('GET/search', JSON.stringify(searchData))
                console.log("+++++++++++++++++++++++++++++++++++")

                // menu/:id
                const menuItemRes = await fetch(`${base}/menu/42`)
                const menuItemData = await menuItemRes.json()

                console.log('GET/menu', JSON.stringify(menuItemData))
                console.log("+++++++++++++++++++++++++++++++++++")

                // order
                const orderRes = await fetch(`${base}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify({
                            dish: 'biryani',
                            quantity: 2
                        })
                    }
                })
                const orderData = await orderRes.json();

                console.log('POST/order', JSON.stringify(orderData))
                console.log("+++++++++++++++++++++++++++++++++++")


            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 served ....")
                resolve()
            })
        })

    })
}

function block_2_response() {
    return new Promise((resolve) => {

        //Always a 1st step
        const app = express()

        app.get('/text', (req, res) => {
            res.send('Hello from chaicode')
        })

        app.get('/json', (req, res) => {
            res.json({
                framework: 'express',
                version: '6.1.1'
            })
        })

        app.get('/not-found', (req, res) => {
            res.status(404).json({
                error: 'Page not found'
            })
        })

        app.get('/health', (req, res) => {
            res.sendStatus(200)
        })

        //if want to redirect from old page to new page
        app.get('/old-menu', (req, res) => {
            res.redirect(301, '/new-menu') // status code for redirect is 301
        })

        //if u want to send xml datatype and so on many datatype using res.type() then 
        app.get('/xml', (req, res) => {
            res.type('application/xml').send('<dish><name> Biryani </name></dish>')
        })

        app.get('/custom-headers', (req, res) => {
            res.set('X-powerd-By', 'ChaiCode');
            res.set('X-request-Id', '12334');
            res.json({
                message: 'Custom headers set'
            })
            //CORS, cachinng, tracing 
        })

        app.get('/no-content', (req, res) => {
            res.status(204).end()
        })

        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            try {

            } catch (error) {

            }
        })
    })
}

function block_1_httpMethod() {
    return new Promise((resolve) => {
        const app = express()
        app.use(express.json())

        const routes = {
            1: {
                id: 1,
                name: "Dadar - Anderi Express",
                direction: "North"
            },
            2: {
                id: 1,
                name: "Bandar - Dadar local",
                direction: "East"
            }
        }

        let index = 3;

        // list all trains
        app.get('/routes', (req, res) => {
            res.json(Object.values(routes))
        })

        //single route id
        app.get('/routes/:id', (req, res) => {
            const route = routes[req.params.id]

            if (!route) return res.status(400).json({ error: 'No route found on this id' })
            res.json(route)
        })

        app.post('/routes', (req, res) => {
            const newRoute = { id: nextId++, ...req.body }
            routes[newRoute.id] = newRoute
            res.status(201).json(newRoute)
        })

        app.put('/routes/:id', (req, res) => {
            const id = req.params;
            if (!routes.id) return res.status(404).json({ error: 'id not found' });
            routes[id] = { id: Number(id), ...req.body }
        })

        app.patch('/routes/:id', (req, res) => {
            const id = req.params.id;
            if (!routes[id]) return res.status(404).json({ error: 'id not found' });
            routes[id] = { id: Number(id), ...req.body }

        })

        app.delete('/routes/:id', (req, res) => {
            const id = req.params.id;
            if (!routes[id]) return res.status(404).json({ error: 'id not found' });
            delete routes[id]
            res.status(204).end()

        })



        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            try {

            } catch (error) {

            }
        })

    })
}

async function main() {
    await block_1_basicServer()
    await block_2_response()

    process.exit(0)
}

main()