console.log('socket');
const socket = io()

socket.emit('message', 'hola soy el cliente comunicando')

 socket.on('event-para-socket', data =>{
    console.log(data)
}) 

/*  socket.on('event-para-todos-menos-socket-actual', data =>{
    console.log(data)
})   */

/* socket.on('event-para-todos', data =>{
    console.log(data)
})   */