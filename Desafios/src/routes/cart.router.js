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
        let result = await CartManagerMongo.newCart()
        res.status(201).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cidd/product/:pid', async(req, res)=>{
    try{
        let result = await CartManagerMongo.updateCart(req.params)
        res.status(201).send({
            status: 'success',
            payload: result
        })

    }catch(eror){
        console.log(error)
    }
})

router.put('/:cidd/product/:pid', async(req,res)=>{
    try {

        const addProduct = await CartManagerMongo.addProductInCart(req.params, req.body)
        res.send({
            status: 'success',
            payload: addProduct
        })   
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cidd/product/:pid', async(req, res)=>{
    try {
        await CartManagerMongo.deleteCartProd(req.params)
        res.send({
            status: 'success',
            payload: `Product with id: ${req.params.pid} delete from cart ${req.params.cidd}}`
        })
    } catch (error) {
        console.log(error)
    }
})


router.delete('/:cidd', async(req, res)=>{
    const {cidd} = req.params 
    try {
        await CartManagerMongo.deleteCartById(cidd)
        res.send({
            status: 'success',
            payload: `Cart with id ${cidd} delete`
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router