const app = require("./src/app")
const { Server } = require("socket.io")
const { socketProducts } = require("./src/public/js/socketProducts")
const {socketChat} = require("./src/public/js/socketChat")

const port = 8080

const httpServer = app.listen(port, ()=>{
    console.log(`Listen on port ... ${port}`)
})

const io = new Server(httpServer)

socketProducts(io)
socketChat(io)


/* 
//escucho si se conecta un nuevo cliente 
 socketServer.on('connection', socket =>{
    console.log('new client connected')

    //escucho en el servidor lo que envia el cliente 
    socket.on('productos', data=>{
        console.log(data)
    })

    socket.emit('event-para-socket-individual', 'esto lo va a recibir el socket del cliente')
 */
/*     socket.broadcast.emit('event-para-todos-menos-socket-actual', 'este msj lo reciben todos menos el que lo envia')
 */
/*     socketServer.emit('event-para-todos', 'este msj lo reciben todos incluso el actual')
  }) */  
 

