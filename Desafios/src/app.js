const express = require ("express")
const cookieParse = require('cookie-parser')
const session = require('express-session') 
const FileStore = require('session-file-store')
const {create} = require('connect-mongo')
const handlebars = require('express-handlebars')
const routerServer = require('./routes/index')
const logger = require('morgan')
const {connectDb} = require("./config/configServer")
const app = express();

connectDb()

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(`${__dirname}/public`))
app.use(logger('dev'))
app.use(cookieParse())

/* app.use(session({
    secret: 'secretCoder',
    resave: true, 
    saveUninitialized: true
}))

 */
/* const fileStore = FileStore(session)
app.use(session({
    store: new fileStore({
        ttl: 100000*60,
        path: '/session',
        retries: 0
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))
 */

app.use(session({
    store: create({
        mongoUrl: 'mongodb+srv://julikisner:X0BWaU02EHJdFIio@cluster0.jq6nt7n.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000000*6000
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
})) 


//new routes
app.use(routerServer)

module.exports = app 


