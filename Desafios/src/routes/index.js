const { Router } = require('express')
const router = Router()
const compression = require('express-compression')
const {serve} = require('swagger-ui-express')

const Views = require('./views.router.js')
const views = new Views()
const Products = require('./product.router.js')
const products = new Products()
const Users = require('./users.router.js')
const users = new Users()
const Session = require('./session.router.js')
const session = new Session()
const Carts = require('./cart.router.js')
const carts = new Carts ()
const Tickets = require('./ticket.router.js')
const ticket = new Tickets()
const MockingProductsRouter = require('./mock.product.router.js');
const mocking = new MockingProductsRouter()
const LoggerRouter = require('./logger.router.js');
const logger = new LoggerRouter()
const MockingUsers = require('./mock/users.test.router.js');
const mockingUsers = new MockingUsers()


router.use(compression({ brotli: { enabled: true, zlib: {} } }))
router.use('/api/views/docs', serve)
router.use('/api/views', views.getRouter())
router.use('/api/products', products.getRouter())
router.use('/api/views/users', users.getRouter())
router.use('/api/views/session', session.getRouter())
router.use('/api/views/carts', carts.getRouter())
router.use('/api/views/tickets', ticket.getRouter())
router.use('/mockingproducts', mocking.getRouter())
router.use('/mockingusers', mockingUsers.getRouter())
router.use('/logger', logger.getRouter())




module.exports = router
