const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateNewMessage, generateLocationMessages } = require('../src/utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.on('join', ({ username, room }) => {
        socket.join()

        socket.emit('message', generateNewMessage('Welcome'))
        socket.broadcast.to(room).emit('message', generateNewMessage('A new user has joined'))
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', generateNewMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateNewMessage('A user has left'))
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('location', generateLocationMessages(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        callback()
    })
})

server.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
