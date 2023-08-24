const {cartService, productService, ticketService} = require('../services')
const { v4: uuidv4 } = require('uuid')
const transport = require("../utils/nodeMailer")
const { isValidObjectId } = require("mongoose")
const config = require('../config/config')

class CartController {

    createCart = async(req, res) =>{
        try {
            const result = await cartService.newCart()
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
    getCart = async(req, res) =>{
        try {
           const {cidd} = req.params
           if (!isValidObjectId(cidd)) {
            return res.status(400).send({ message: `Invalid cart ID: ${cidd}` });
          }
            
           const cart = await cartService.getById(cidd)
           if(!cart) return res.status(404).send({ message: `Cart with ID ${cidd} not found` })
           res.status(201).send({
            status: 'success',
            payload: cart
        })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
/*     update = async(req, res) =>{
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
 */    updateProduct = async (req, res) => {
        try {
          const { cidd, pid } = req.params;
          const { quantity } = req.body;
      
          const cartFound = await cartService.getById({ _id: cidd });
      
          if(!cartFound) throw({ status:"Error", message:"The cart does not exist" })

          const updatedCart = await cartService.update({ _id: cidd }, pid, quantity);
      
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
    purchase = async(req, res) =>{
        try {
            const {cidd} = req.params
            const cart = await cartService.getById(cidd) 
            //console.log(cart)
            const user = req?.user ?? null
            //console.log(user)

            const insufficientStock = []
            const buyProducts = []

            if(!cart) throw({status:"Error", message:"Cart not found"})
            
            cart.products.forEach(async item => {
                const product = item.product
                const quantity = item.quantity
                const stock = item.product.stock

                quantity > stock 
                ? insufficientStock.push(product) 
                : buyProducts.push({product, quantity}) 
                    && await productService.updateProduct(product, {stock: stock - quantity}) 
                    && await cartService.deleteCartProd(cart, product) 
            });


            const totalAmount = buyProducts.reduce((acc, item) => acc + item.quantity, 0)
            const totalPrice = buyProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0 ).toFixed(3)
            
            if(!buyProducts.length){
                throw({
                    status:"Error", 
                    message:"Insufficient stock in the products", 
                    products: insufficientStock.map(prod => prod.title)
                })
            } 

            if(buyProducts.length > 0){  
                const ticket = await ticketService.createTicket({
                    code: uuidv4(),
                    amount: totalAmount,
                    purchaser: user.email,
                })

                await transport.sendMail({
                    from: config.GMAIL_EMAIL_ADMIN,
                    to: user.email,
                    subject: "Thanks for your purchase",
                    html:`<div>
                                <h1>
                                    Thanks for your purchase.
                                    the total to pay is $${totalPrice}
                                </h1>
                          </div>`
                })

                res.send({status:"Success", message:"Successful purchase", toTicket: ticket})
            }
        } catch (error) {
            return res.status(500).sendServerError(error.message)
        }
    }

}

module.exports = CartController