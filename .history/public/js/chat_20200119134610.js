const socket = io()


// Elements
const $messageForm = document.querySelector('#mess-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')



socket.on('message', (message) => {
    console.log(message);
})

socket.on('location', (location) => {
    console.log(location);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // disable
    const inputField = e.target.elements.message.value

    socket.emit('sendMessage', inputField, (errorProfanity) => {
        $messageFormButton.removeAttribute('disabled')


        // enable

        if (errorProfanity) {
            return console.log(errorProfanity)
        }

        console.log('Message was delivered')
    })
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
        socket.emit('sendLocation', object, () => {
            console.log('Location shared!')
        })
    })
})