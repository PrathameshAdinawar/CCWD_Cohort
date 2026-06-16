// To learn about how server works in RAW format
//In this will learm how to make a raw server there are many libraries and frameworks express is one of them
// Raw HTTP server
const http = require('http') // require cause common js module system

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/menu') {

        res.writeHead(200, {
            'content-type': 'application/json'
        })

        res.end(JSON.stringify({ items: ['thali', 'ladoo'] }))

    } else if (req.method === 'POST' && req.url === '/order') {

        let data = ''
        req.on('data', chunk => data += chunk) // data comes in chucks so we append it one by one in the data 
        req.on('end', () => {

            const order = JSON.parse(data)

            res.writeHead(200, {
                'content-type': 'application/json'
            })

            res.end(JSON.stringify({
                status: 'received',
                order
            }))
        })
    }

})
