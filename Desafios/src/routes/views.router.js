const ViewsController = require("../controllers/views.controller");
const { RouterClass } = require("./routerClass");
const { passportAuth } = require('../passport-JWT/passportAuth')

const views = new ViewsController()

class ViewsRouter extends RouterClass {

    init() {
        this.get('/products', ['PUBLIC'], passportAuth('jwt'), views.products)
        this.get('/session/login', ['PUBLIC'],  /* passportAuth('jwt'), */  views.login)
        this.get('/session/logout', ['PUBLIC'],  /* passportAuth('jwt'), */  views.logout)
        this.get('/session/register', ['PUBLIC'], /* passportAuth('jwt') , */ views.register)
        this.get('/session/profile', ['PUBLIC'], /* passportAuth('jwt') */ views.profile)
    }
}

module.exports = ViewsRouter