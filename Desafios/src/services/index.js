//Traer instancias del Dao
//Va a ir repository aca 

/* const ProductManagerMongo = require('../dao/mongo/product.mongo')
const UserManager = require('../dao/mongo/user.mongo')
const CartManagerMongo = require('../dao/mongo/cart.mongo')

const productService = new ProductManagerMongo()
const userService = new UserManager()
const cartService = new CartManagerMongo()

module.exports = {
    productService,
    userService,
    cartService
} */

const {ProductDao, UserDao, CartDao} = require('../dao/factory')

const ProductRepository = require('../repositories/product.repository')
const UserRepository = require('../repositories/user.repository')
const CartRepository = require('../repositories/cart.repository')

const productService = new ProductRepository(new ProductDao())
const userService = new UserRepository(new UserDao())
const cartService = new CartRepository(new CartDao())

module.exports = {
    productService,
    userService,
    cartService
}