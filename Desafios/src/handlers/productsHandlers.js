const ProductManager = require("../dao/ProductManager")

const product = new ProductManager("../products.json")

const getProducts = async (req, res) =>{

    try {
        const {limit} = req.query
        const products = await product.getProducts()
        if(!limit){
            return res.status(200).send({
                products
            })
        }
        return res.status(200).send({
            products: products.slice(0, limit)
        })
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (req, res) =>{

    const {pid} = req.params

    try {
        const productDb = await product.getProductById(parseInt(pid))
        if (!productDb) {
        throw new Error('object not found')
        }
        res.status(200).send({productDb})
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

const createProduct = async (req, res) =>{
    const {title, description, price, thumbnail, code, stock, status, category}= req.body
    try {
        const newProduct = {title, description, price, thumbnail, code, stock, status, category}
        const createProduct = await product.addProduct(newProduct)

        return res.status(201).send({createProduct})
        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

const updateProduct = async (req, res) =>{
    try {
        const {pid} = req.params
        const newObject = req.body

        const updatedProduct = await product.updateProduct(parseInt(pid), newObject)

        res.status(200).send({updatedProduct})

    } catch (error) {
        return res.status(404).send({error: error.message})        
    }
}

const deleteProduct= async (req, res) =>{

    try {
        const {pid} = req.params
        const deletedProduct = await product.deleteProduct(parseInt(pid))
        res.status(200).send({deletedProduct})
        
    } catch (error) {
        return res.status(404).send({error: error.message})        
    }
}

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct }