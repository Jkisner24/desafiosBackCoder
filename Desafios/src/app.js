const express = require ("express")
const handlebars = require('express-handlebars')
const routerServer = require('./routess/index')
const logger = require('morgan')
const {connectDb} = require("./config/configServer")
//new routes
const app = express();

connectDb()

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(`${__dirname}/public`))
app.use(logger('dev'))


//new routes
app.use(routerServer)

module.exports = app 


