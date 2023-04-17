const express = require ("express")
const welcomeRouter = require("./routes/welcomeRouter")
const productsRouter = require("./routes/productsRouter")
const cartsRouter = require("./routes/cartsRouter")
const viewRouter = require("./routes/viewRouter")


const app = express();

const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', viewRouter)
app.use('/', welcomeRouter)
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)


module.exports = app 


