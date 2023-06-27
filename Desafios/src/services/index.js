//Traer instancias del Dao
//Va a ir repository aca 

const ProductManagerMongo = require('../dao/mongo/product.mongo')
const UserManager = require('../dao/mongo/user.mongo')
const CartManagerMongo = require('../dao/mongo/cart.mongo')

const productService = new ProductManagerMongo()
const userService = new UserManager()
const cartService = new CartManagerMongo()

module.exports = {
    productService,
    userService,
    cartService
}

