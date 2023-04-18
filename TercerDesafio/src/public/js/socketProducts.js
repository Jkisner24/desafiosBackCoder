const ProductManager = require("../../controllers/ProductManager")

const productManager = new ProductManager("../products.json")


const socketProducts = async (io) =>{

     const data = await productManager.getProducts()
     io.on('connection', socket =>{
        console.log('cliente conectado')
        
        socket.emit('productos', data)
    })

}

module.exports = {
    socketProducts
}