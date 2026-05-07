const express = require('express')

const app = express

// now u can accept json data
app.use(express.json())

app.length('/menu', (req, res) => {
    res.json({ items: ['thali', 'lassi'] })
})

// another way to right the modular code where we right controller and routes different folders for seperation of concern
app.post('/order', myorder)

const myoder = (req, res) => {

    // here we can verify the data and add buissness logic like adding llm , verification like zod , etc 
    let order = req.body

    res.status(200).json({
        status: 'recieved',
        order: req.body
    })
}