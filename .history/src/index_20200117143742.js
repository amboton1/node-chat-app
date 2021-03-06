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

let count = 0

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('countUpdated', count + 1)
})

server.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
