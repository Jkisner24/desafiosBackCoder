const express = require ("express")
const logger = require('morgan')
const {connectDb} = require("./config/configServer")
const welcomeRouter = require("./routes/welcomeRouter")
const productsRouter = require("./routes/productsRouter")
const cartsRouter = require("./routes/cartsRouter")
const viewRouter = require("./routes/viewRouter")
//new routes
const routerServer = require('./routess')
const app = express();

connectDb()

/* app.get('/chat', (req, res)=>{
 res.render('chat', {})
}) 
 */

const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))

app.use('/', viewRouter)
app.use('/', welcomeRouter)
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)

//new routes
app.use(routerServer)



module.exports = app 


