const socket = io()

socket.on('message', (greet) => {
    console.log(greet)
})

document.getElementById("form").addEventListener("submit", function(){
    socket.emit('form')
});

/* socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    socket.emit('increment')
}); */