const CartController = require('../controllers/cart.controller')
const { RouterClass } = require("./routerClass");
const { passportAuth } = require('../passport-JWT/passportAuth')

const cart = new CartController

class CartRouter extends RouterClass{
    init(){
        this.post('/', ['PUBLIC'], cart.createCart)
        this.get('/', ['PUBLIC'], cart.get)
        this.get('/:cidd', ['PUBLIC'], passportAuth('jwt'), cart.getCart)
        this.put('/:cidd/product/:pid', ['PUBLIC'], cart.updateProduct)
        this.post('/:cidd/purchase', ['PUBLIC'], passportAuth('jwt'), cart.purchase)
        this.delete('/:cidd/product/:pid', ['PUBLIC'], cart.deleteProd)
        this.delete('/:cidd', ['PUBLIC'] , cart.deleteCart)
        
    }
}

module.exports = CartRouter 