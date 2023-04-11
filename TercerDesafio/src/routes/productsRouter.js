const Router = require("express")
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../handlers/productsHandlers")

const productsRouter = Router()

productsRouter.get("/", getProducts)
productsRouter.get("/:pid", getProductById)
productsRouter.post("/", createProduct)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", deleteProduct)


module.exports = productsRouter;