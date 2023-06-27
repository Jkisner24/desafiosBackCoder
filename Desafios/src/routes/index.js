const { Router } = require('express')
const router = Router()
//const views = require('./homeView.router.js')
//const viewProducts = require('./productsView.router.js')
const Views = require('./views.router.js')
const views = new Views()
const Products = require('./product.router.2.js')
const products = new Products()
const Users = require('./users.router.2.js')
const users = new Users()
const Session = require('./session.router.2.js')
const session = new Session()
//const userRouter = require('./users.router.js');
//const users = new userRouter()


//const viewUser = require('./userView.router.js')
// const chatRouter = require('./chatView.router.js')
// const viewCarts = require('./cartView.router.js')
// const realtime = require('./realtimeproductsView.router.js')
// const productRouter = require('./product.router.js')
// const cartRouter = require('./cart.router.js')
//const userRouter = require('./user.router.js')
//const sessionRouter = require('./session.router.js')



//router.use('/api/views', sessionRouter)
//router.use('/api/views', views)
//router.use('/api/views', viewProducts)
router.use('/api/views', views.getRouter())
router.use('/api/views/products', products.getRouter())
router.use('/api/views/users', users.getRouter())
router.use('/api/views/session', session.getRouter())

//router.use('/api/v2/users', users.getRouter())


//router.use('/api/views', viewUser)
// router.use('/api/views', chatRouter)
// router.use('/api/views', viewCarts)
// router.use('/api/users', userRouter)
// router.use('/api/realtimeproducts', realtime)
// router.use('/api/products', productRouter)
// router.use('/api/cart', cartRouter)



module.exports = router
