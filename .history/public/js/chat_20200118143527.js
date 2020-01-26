const socket = io()

const inputField = document.querySelector('input')

document.querySelector('#mess-form').addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit('sendMessage', inputField.value)
})


/* socket.on('message', (message) => {
    console.log(message);
}) */

/* socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    socket.emit('increment')
}); */