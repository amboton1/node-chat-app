const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateNewMessage, generateLocationMessages } = require('../src/utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateNewMessage('Welcome'))
        socket.broadcast.to(user.room).emit('message', generateNewMessage(`${user.username} has joined!`))

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        const { user } = getUser({ id: socket.id })


        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        socket.broadcast.to(user.room).emit('message', generateNewMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateNewMessage(`${user.username} has left!`))
        }
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('location', generateLocationMessages(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        callback()
    })
})

server.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
