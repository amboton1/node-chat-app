const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#mess-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const inputField = e.target.elements.message.value

    socket.emit('sendMessage', inputField)
})

/* socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    socket.emit('increment')
}); */