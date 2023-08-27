const { authHeaders } = require("../config/jwt");
const ViewsController = require("../controllers/views.controller");
const { RouterClass } = require("./routerClass");
const { passportAuth } = require('../passport-JWT/passportAuth');
const auth = require("../middlewares/autenticacion.middleware");
const passport = require("passport");

const views = new ViewsController()

class ViewsRouter extends RouterClass {

    init() {
        this.get('/products', ['PUBLIC'], passportAuth('jwt') , views.products)
        this.get('/session/login', ['PUBLIC'], views.login)
        this.get('/session/logout', ['PUBLIC'], views.logout)
        this.get('/session/register', ['PUBLIC'], views.register)
        this.get('/session/profile', ['PUBLIC'], passportAuth('jwt'), views.profile)
        this.get('/carts/:cidd', ['PUBLIC'], views.userCart)
    }
}

module.exports = ViewsRouter