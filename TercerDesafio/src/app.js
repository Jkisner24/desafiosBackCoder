const express = require ("express")
const welcomeRouter = require("./routes/welcomeRouter")
const productsRouter = require("./routes/productsRouter")
const cartsRouter = require("./routes/cartsRouter")


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', welcomeRouter)
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)
/* app.use('/api/carts', )

/* app.get("/api/productos", async (req, res)=>{
    try {
        const { limit } = req.query
        const products = await product.getProducts()        
        if(!limit) {
            return res.send({
                status: 'success',
                products
            })            
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })   
    }catch (error){
        console.log(error)
    }
}) */

/* app.get("/api/productos/:pid", async (req, res)=>{
    try {
        const {pid}= req.params

        const productDb = await product.getProductById(parseInt(pid))
        
        if (!productDb) {
            return res.send({status: 'error', error: 'product not found'})
        }
        res.send({productDb})
    }catch (error){
        console.log(error)
    }
})
 */
module.exports = app 


