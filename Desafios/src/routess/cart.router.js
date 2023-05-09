const {Router} = require('express')
const CartManagerMongo = require('../dao/mongo/cart.mongo')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const carts = await CartManagerMongo.getCarts(req.query)
        res.status(200).send({
            status: 'success',
            payload: carts
        })
    } catch (error) {
       console.log(error) 
    }
})

router.get('/:cidd', async (req, res)=>{
    try {
        const {cidd} = req.params
        let cart = await CartManagerMongo.getCartById(cidd)
        res.status(200).send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res)=>{
    try {
        let result = await CartManagerMongo.newCart(req.body)
        res.status(201).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cidd/product/:pid', async(req,res)=>{
    try {
        const addProduct = await Manager.addProductInCart(req.params)
        res.send({
            status: 'success',
            payload: addProduct
        })   
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cidd', async(req, res)=>{
    try {
        const delCart = await Manager.delCart(req.params)
        res.send({
            status: 'success',
            payload: delCart
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router