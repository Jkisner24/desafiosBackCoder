const {Router} = require('express')
const {getBienvenida} = require("../handlers/welcomeHandlers")


const welcomeRouter = Router();

welcomeRouter.get("/", getBienvenida);

module.exports = welcomeRouter;