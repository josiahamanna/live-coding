const express = require('express')
const app = express()
const { PORT } = require('./config/config')

const socket = require('socket.io')

const cors = require('cors')
app.use(cors())

const socketsArray = []

/*
	This function will genearte a random string and send that string to the client. The function will create a new socket namespace with the randomly generated string as its name.
*/
app.get('/getSessionURL', (req, res) => {
    // Generate a random string which will be used for socket namespace. 
    const url = Math.random().toString(36).substring(2)

    // Keep track of all the socket namespaces taht are generated.
    socketsArray.push(url)

    // Create a new socket namespace
    const newSocket = io.of(url)
    newSocket.on('connection', (socket) => {
        console.log('Someone connected with socket id: ', socket.id)

        // Event listener to listen to the data send by the client.
        socket.on('SEND_MESSAGE', (data) => {
            socket.broadcast.emit('RECEIVE_MESSAGE', data)
        })

        // Event listener to listen to client if they changed the language settings.
        socket.on('CHANGED_LANGUAGE', (data) => {
            socket.broadcast.emit('RECEIVE_CHANGED_LANGUAGE', data)
        })

        // Event listener to listen to request when the user is going to leave the session.
        socket.on('LEAVE_SESSION', () => {
            const nameSpace = socket.nsp.name

            // Count number of clients connected to a particular socket namespace.
            newSocket.clients((error, clients) => {
                // If the there is only one user connected then delete the socket namespace because that user has sent the leave session message and after this message he/she will close the connection.
                if (clients.length <= 1) {
                    deleteSocketNamespace(newSocket)
                }
            })
        })
    })
    res.send({ url })
})

app.get('/checkSocketExists', (req, res) => {
    if (socketsArray.includes(req.query.url)) {
        res.send({ isSocketPresent: true })
    } else {
        res.send({ isSocketPresent: false })
    }
})

server = app.listen(PORT, () => {

    io = socket(server)
    console.log('Server started, listening to port ', PORT)
})

function deleteSocketNamespace(socket) {
    console.log(`Deleting ${socket.name} socket namespace`)
    // Get Object with Connected SocketIds(clients who are connected) as properties
    const connectedNamespaceSockets = Object.keys(socket.connected)

    // It will run just once as there is only one user connected. Manually disconnecting the client. 
    connectedNamespaceSockets.forEach(socketId => {
        // disconnect each socket(client) 
        socket.connected[socketId].disconnect()
    })

    // Remove all Listeners for the event emitter
    socket.removeAllListeners()
    // Remove from the namespaces
    delete io.nsps[socket.name]
}

