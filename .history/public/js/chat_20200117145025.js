const socket = io()

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.getElementById("increment").addEventListener("click", function(){
    document.getElementById("increment").nodeValue += this.count;
  });