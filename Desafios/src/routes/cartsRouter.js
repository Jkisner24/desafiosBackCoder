const Router = require('express')
const {getCartsById, createCart , addProductById, getCarts } = require("../handlers/cartHandlers")


const cartsRouter = Router()

cartsRouter.get("/", getCarts)
cartsRouter.get("/:cid", getCartsById)
cartsRouter.post("/", createCart)
cartsRouter.post("/:cid/productos/:pid", addProductById)
 
module.exports = cartsRouter;


