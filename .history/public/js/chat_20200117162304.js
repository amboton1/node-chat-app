const socket = io()

socket.on('message', (greet) => {
    console.log(greet)
})

/* socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    socket.emit('increment')
}); */