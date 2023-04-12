const Router = require('express')
const {getCartsById, createCart , addProductById } = require("../handlers/cartHandlers")


const cartsRouter = Router()

cartsRouter.get("/:cid", getCartsById)
cartsRouter.post("/", createCart)
cartsRouter.post("/:cid/productos/:pid", addProductById)
 
module.exports = cartsRouter;


