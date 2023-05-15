const { Router } = require('express')
const router = Router()
const views = require('./homeView.router.js')
const realtime = require('./realtimeproducts.js')
const productRouter = require('./product.router.js')
const cartRouter = require('./cart.router.js')
const userRouter = require('./user.router.js')
const chatRouter = require('./chat.router.js')


router.use('/api/', views)
router.use('/api/realtimeproducts', realtime)
router.use('/api/productoss', productRouter)
router.use('/api/cartt', cartRouter)
router.use('/api/users', userRouter)
router.use('/api/chat', chatRouter)


module.exports = router