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

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })

    socket.on('sendLocation', (location) => {
        io.emit('location', `Location: https://google.com/maps?q=${location.latitude},${location.longitude}`)
    })


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
