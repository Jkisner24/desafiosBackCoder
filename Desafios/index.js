const config = require('./src/config/config');
//const dotenv = require('dotenv');
const app = require("./src/app")
const { Server } = require("socket.io")
const { socketProducts } = require("./src/public/js/socketProducts")
const {socketChat} = require("./src/public/js/socketChat");
const logger = require('./src/config/logger.js')

//dotenv.config();

const PORT = config.PORT || 8080;
const httpServer = app.listen(PORT, (err)=>{
    if (err)`ERROR en el servidor ${err}`
    logger.info(`Listen on port ... ${PORT}`)
})

const io = new Server(httpServer)

socketProducts(io)
socketChat(io)

