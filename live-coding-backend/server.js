const express = require('express')
const app = express()
const { PORT } = require('./config/config')

const socket = require('socket.io')

const cors = require('cors')
app.use(cors())

const socketsArray = []

app.get('/getSessionURL', (req, res) => {
    const URL = Math.random().toString(36).substring(2)

    socketsArray.push(URL)


})

server = app.listen(PORT, () => {

    io = socket(sever)
    console.log('Server started, listening to port ', PORT)

})

