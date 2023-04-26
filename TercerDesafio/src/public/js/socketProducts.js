const ProductManager = require("../../controllers/ProductManager")

const productManager = new ProductManager("../products.json")

const socketProducts = async (io) =>{

     const datosProd = await productManager.getProducts()
     io.on('connection', socket =>{
        console.log('cliente conectado')
        
        socket.emit('productos', datosProd)
    
        socket.on('addProduct', data =>{
            console.log(data)
            productManager.addProduct(data)
        })
    })

}

module.exports = {
    socketProducts
}