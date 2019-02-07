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

    const newSocket = io.of(URL)
    newSocket.on('connection', (socket) => {
        console.log('Someone connected with socket id: ', socket.id)

        socket.on('SEND_MESSAGE', (data) => {
            socket.broadcast.emit('RECEIVE_MESSAGE', data)
        })

        socket.on('CHANGED_LANGUAGE', (data) => {
            socket.broadcast.emit('RECEIVE_CHANGED_LANGUAGE', data)
        })
    })
    res.send({ url })
})

server = app.listen(PORT, () => {

    io = socket(sever)
    console.log('Server started, listening to port ', PORT)

})

