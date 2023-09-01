const productManagerMongo =  require("../../dao/mongo/product.mongo")
const productManagerMongoInstance = new productManagerMongo();

const socketProducts = async (io) =>{
   
     io.on('connection', async socket =>{
        try{
        console.log('cliente conectado')
        
        let products = await productManagerMongoInstance.get()

        socket.emit('productosDB', products)

        socket.on('addProduct', async (data) =>{
            console.log(data)
            await productManagerMongoInstance.create(data)
            let products = await productManagerMongoInstance.get()
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