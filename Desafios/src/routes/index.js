const { Router } = require('express')
const router = Router()
const Views = require('./views.router.js')
const views = new Views()
const Products = require('./product.router.2.js')
const products = new Products()
const Users = require('./users.router.2.js')
const users = new Users()
const Session = require('./session.router.2.js')
const session = new Session()
const Carts = require('./cart.router.js')
const carts = new Carts ()

router.use('/api/views', views.getRouter())
router.use('/api/views/products', products.getRouter())
router.use('/api/views/users', users.getRouter())
router.use('/api/views/session', session.getRouter())
router.use('/api/views/carts', carts.getRouter())


module.exports = router
