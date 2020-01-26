const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

socket.on('location', (location) => {
    console.log(location);
})

document.querySelector('#mess-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const inputField = e.target.elements.message.value

    socket.emit('sendMessage', inputField)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by older browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {latitude, longitude})
    })
})