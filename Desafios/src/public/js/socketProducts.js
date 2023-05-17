const productManagerMongo =  require("../../dao/mongo/product.mongo")

const socketProducts = async (io) =>{
   
     io.on('connection', async socket =>{
        try{
        console.log('cliente conectado')
        
        let products = await productManagerMongo.getProducts()

        socket.emit('productosDB', products)

        socket.on('addProduct', async (data) =>{
            console.log(data)
            await productManagerMongo.createProduct(data)
            let products = await productManagerMongo.getProducts()
            socket.emit('productosDB', products)
        })
    } catch(error){
        console.log(error)
    }
    });
}

module.exports = {
    socketProducts
}