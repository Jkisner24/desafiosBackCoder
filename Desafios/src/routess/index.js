const { Router } = require('express')
const productRouter = require('./product.router.js')
const userRouter = require('./cart.router.js')


const router = Router()

router.use('/api/productoss', productRouter)

 router.use('/api/cartt', userRouter)
 
module.exports = router
