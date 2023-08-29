const express = require ("express")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = require('express-handlebars')
const cookieParse = require('cookie-parser')
const session = require('express-session') 
const {create} = require('connect-mongo')
const passport = require('passport')
const cors = require('cors')
const routerServer = require('./routes/index')
const {initPassport} = require('./passport-JWT/passport.config')
const errorMiddleware = require('./middlewares/errors/indexError')
const addLogger = require('./middlewares/logger.midd.js')
const { initPassportGithub } = require("./passport-JWT/passport.config2")
const app = express();
require("dotenv")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/static', express.static(`${__dirname}/public`))
app.use(cookieParse("S1gn3d Co0k13"))


app.use(addLogger)

initPassport()
/* initPassportGithub()
 */passport.use(passport.initialize())
/* passport.use(passport.session())
 */
/* app.use(session({
    store: create({
        mongoUrl: process.env.MONGO_URL,
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
 */

app.use(routerServer)
app.use(errorMiddleware)

module.exports = app 


