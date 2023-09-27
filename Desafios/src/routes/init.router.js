const { RouterClass } = require("./routerClass");

class InitRouter extends RouterClass {

    init() {
        this.get('/', ['PUBLIC'], this.redirectToLogin)
    }
}

module.exports = InitRouter