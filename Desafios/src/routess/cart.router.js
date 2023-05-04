const {Router} = require('express')
const CartManagerMongo = require('../dao/mongo/cart.mongo')

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const carts = await CartManagerMongo.getCarts()
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
        let result = await CartManagerMongo.addCart()
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
       res.status(200).send('ruta put') 
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cidd', async(req, res)=>{
    try {
        res.status(200).send('ruta delete')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router