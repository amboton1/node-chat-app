const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// let count = 0

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.on('sendMessage', () => {
        io.emit('sendMessage', inputField.value)
    })


    // socket.emit('message', 'Welcome!')

    /* socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // for all connections
        io.emit('countUpdated', count)
    }) */
})

server.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
