//Traer instancias del Dao

//llamo de factory
const {ProductDao, UserDao, CartDao, TicketDao} = require('../dao/factory')

//llamo de repository
const ProductRepository = require('../repositories/product.repository')
const UserRepository = require('../repositories/user.repository')
const CartRepository = require('../repositories/cart.repository')
const TicketRepository = require('../repositories/ticket.repository')

const productService = new ProductRepository(ProductDao())
const userService = new UserRepository(UserDao())
const cartService = new CartRepository(CartDao())
const ticketService = new TicketRepository(TicketDao())

module.exports = {
    productService,
    userService,
    cartService,
    ticketService
}