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





module.exports = app 


