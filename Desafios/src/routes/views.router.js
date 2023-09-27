const ViewsController = require("../controllers/views.controller");
const { RouterClass } = require("./routerClass");
const { passportAuth, passportCallUrl } = require('../passport-JWT/passportAuth');
const swagger = require('swagger-ui-express')
const swaggerJSOption = require('../config/config.swagger')


const views = new ViewsController()

class ViewsRouter extends RouterClass {

    init() {
        this.get('/docs', ['PUBLIC'], swagger.setup(swaggerJSOption))
        this.get('/products', ['PUBLIC'], passportAuth('jwt') , views.products)
        this.get('/products/:pid', ['PUBLIC'], passportAuth('jwt') , views.productsById)
        this.get('/session/login', ['PUBLIC'], views.login)
        this.get('/session/logout', ['PUBLIC'], views.logout)
        this.get('/session/register', ['PUBLIC'], views.register)
        this.get('/session/profile', ['PUBLIC'], passportAuth('jwt'), views.profile)
        this.get('/session/restore', ['PUBLIC'], views.restorePassword)
        this.get('/session/new-password', ['PUBLIC'], passportCallUrl('jwt'), views.newPassword)
        this.get('/carts/:cidd', ['PUBLIC'], passportAuth('jwt'), views.userCart)
        this.get('/chat', ['PUBLIC'], views.chat)

    }
}

module.exports = ViewsRouter