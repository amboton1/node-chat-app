const socket = io()


// Elements
const $messageForm = document.querySelector('#mess-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const $messagesTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML


socket.on('message', (message) => {
    const html = Mustache.render($messagesTemplate, {
        message: message.msg,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('location', (location) => {
    const html = Mustache.render($locationTemplate, {
        url: location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // disable
    const inputField = e.target.elements.message.value

    socket.emit('sendMessage', inputField, (errorProfanity) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()


        if (errorProfanity) {
            return console.log(errorProfanity)
        }

        console.log('Message was delivered')
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by older browser.')
    }

    // disable
    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const object = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', object, () => {
            $locationButton.removeAttribute('disabled')

            console.log('Location shared!')
        })
    })
})