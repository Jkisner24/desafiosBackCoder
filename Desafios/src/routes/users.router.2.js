const UserController = require("../controllers/user.controller");
const { RouterClass } = require("./routerClass");

const user = new UserController()

class UsersRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], user.get)
        this.get('/:uid', ['PUBLIC'], user.getById)
        this.post('/', ['PUBLIC'], user.post)
        this.put('/:uid', ['PUBLIC'], user.put)
        this.delete('/:uid', ['PUBLIC'], user.delete)
    }
}
module.exports = UsersRouter