const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

socket.on('location', (lat, long) => {
    console.log(`Latitude: ${lat}, Longitude: ${long}`);
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
        const object = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', object.latitude, object.longitude)
    })
})