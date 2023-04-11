const {Router} = require ('express')
const CartManager = require("../controllers/cartManager")
const ProductManager = require("../controllers/productManager")

const router = Router();
const product = new ProductManager("../products.json")
const carts = new CartManager("../cart.json")

const getCarts = async (req, res) =>{
    try {
        const products = await carts.getCarts()
        return res.status(200).send({
            products
        }) 
    } catch (error) {
        console.log(error)
    }
}


const getCartsById = async (req, res) =>{
    
    const {cid} = req.params
    try {
        const products = await carts.getCartsById(parseInt(cid))
        if(!products){
            throw new Error('object not found')
        }
        res.status(200).send({products})
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}


const createCart = async (req, res) =>{
    
    const newCart= req.body
    try {
        const cartCreated = await carts.addCart(newCart)
        console.log(cartCreated)
        res.status(201).send({cartCreated})

    } catch (error) {
        console.log(error);
    }
}

const addProductById = async (req, res) =>{

        const {cid, pid} = req.params
        const product = await product.getProductById(parseInt(pid));
        if (product) {
          const cart = await carts.addToCart(parseInt(cid), parseInt(pid))
          !cart ? res.status(404).send({ error: "Product not found" }) : res.status(200).send(cart)


        } else {
            res.status(404).send({ error: "Product not found" })
          }
        
}



module.exports = { getCartsById, createCart, addProductById, getCarts}