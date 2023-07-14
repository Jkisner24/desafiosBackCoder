const CartController = require('../controllers/cart.controller')
const { RouterClass } = require("./routerClass");

const cart = new CartController

class CartRouter extends RouterClass{
    init(){
        this.post('/', ['PUBLIC'], cart.createCart)
        this.get('/', ['PUBLIC'], cart.get)
        //this.get('/:cidd', ['PUBLIC'], cart.getById)
        this.put('/:cidd', ['PUBLIC'], cart.update)
        this.put('/:cidd/product/:pid', ['PUBLIC'], cart.updateProduct)
        this.post('/:cidd/generate', /* ['USER', "ADMIN"] */ ['PUBLIC'], cart.generateTicket)
        this.delete('/:cidd/product/:pid', ['PUBLIC'], cart.deleteProd)
        this.delete('/:cidd', ['PUBLIC'], cart.deleteCart)
        
    }
}

module.exports = CartRouter 