const {cartService, productService} = require('../services')
const { v4: uuidv4 } = require('uuid')
const { sendMail } = require("../utils/nodemailer")
const { cartModel } = require('../dao/mongo/model/cart.model')

class CartController {

    createCart = async(req, res) =>{
        try {
            const result = await cartService.newCart()
            console.log(result)
            res.status(201).send({ 
                status: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).sendServerError("Cart not generated")
        }
    }
    get = async(req, res) =>{
        try {
            const carts = await cartService.getCarts()
            res.status(201).send({
                status: 'success',
                payload: carts
            })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    getById = async(req, res) =>{
        try {
           const {cidd} = req.params
           const cart = await cartService.getById({_id:cidd})
           console.log(cart)
           if(!cart) return res.status(404).send({ message: `Cart with ID ${cidd} not found` })
           res.status(201).send({
            status: 'success',
            payload: cart
        })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    update = async(req, res) =>{
        try {
            const { cidd } = req.params
            const newCart = req.body
            let response = await cartService.updateCart(cidd, newCart)
            if(!response) return res.status(400).send({message: 'We cant updated the cart'})
            res.status(200).send({message: 'Cart updated', payload: response})
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    updateProduct = async (req, res) => {
        try {
          const { cidd, pid } = req.params;
          const { quantity } = req.body;
      
          const cartFound = await cartModel.findOne({ _id: cidd });
      
          if (cartFound) {
            const productIndex = cartFound.products.findIndex(product => product.idProduct === pid);
            if (productIndex !== -1) {
              // El producto ya existe en el carrito, actualiza la cantidad
              cartFound.products[productIndex].quantity = quantity;
            } else {
              // El producto no existe en el carrito, añádelo
              cartFound.products.push({ idProduct: pid, quantity: quantity });
            }
            await cartFound.save();
          }
      
          const updatedCart = await cartModel.findById(cidd);
      
          return res.status(201).send({
            status: 'success',
            payload: updatedCart
          });
        } catch (error) {
          return res.status(500).send({
            status: 'error',
            message: 'Internal server error'
          });
        }
      };
          deleteProd = async(req, res) =>{
        try {
            const {cidd, pid} = req.params
            let response = await cartService.deleteCartProd(cidd, pid)
            if(!response) return res.status(400).send({message: 'Cannot deleted products in cart'})
            res.status(200).send({
                status: 'success',
                payload: response
            })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    deleteCart = async(req, res) =>{
        try {
            const {cidd} = req.params
            let response = await cartService.deleteCartById(cidd)
            if(!response) return res.status(400).send({message: 'Cannot deleted cart'})
            res.status(200).send({
                status: 'success',
                payload: response
            })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    generateTicket = async(req, res) =>{
        try {
            const {cidd} = req.params
            const cart = await cartService.getById(cidd)
            if(!cart) return res.status(404).send({ message: `Cart with ID ${cidd} not found` })

            const productsOutOfStock = []

            for(const item of cart.products){
                let product = item.product
                let quantity = item.quantity
                let stock = item.product.stock
                if(quantity > stock) productsOutOfStock.push(product)
                else{
                        await productService.productUpdate(
                        product, 
                        {quantity: stock - quantity}
                )}
            }
            const productsPurchase = cart.products.filter(prod => 
                !productsOutOfStock.includes(pro => pro.product._id === prod.product._id))

            if(productsPurchase.length > 0){
                const ticket = {
                    code: uuidv4(),
                    parchase_datetime: new Date(),
                    amount: productsPurchase.reduce((total, prod)=> total + (prod.cantidad * prod.product.price), 0),
                    purchaser: req.user.email
                };
                
                const generateTicket = await cartService.generateTicket(ticket)

                cart.products = productsOutOfStock;
                await cartService.updateCart(cidd, productsOutOfStock)

                if(productsOutOfStock.length > 0){
                    await sendMail(ticket)
                    res.status(201).send({
                        message: 'Partially purchase',
                        ticket: generateTicket})
                }else{
                    await sendMail(ticket)
                    res.status(201).send({
                        message: 'Successful purchase',
                        ticket: generateTicket})
                }

            }else{
                const productsOutOfStockId = productsOutOfStock.map(prod => prod.product._id)
                res.status(200).send({
                    message: 'Cannot completed purchase',
                    payload: productsOutOfStockId});
            }

        } catch (error) {
            return res.status(500).sendServerError(error.message)
        }
    }

}

module.exports = CartController