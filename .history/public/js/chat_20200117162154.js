const socket = io()

socket.on('message', (greet) => {
    console.log(greet)
})

document.getElementById("mess-form").addEventListener("submit", (e) => {
    e.preventDefault()
    
    const message = document.querySelector('input').value
    socket.emit('sendMessage', message)
});

/* socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    socket.emit('increment')
}); */