const ProductController = require("../controllers/products.controller");
const { passportAuth } = require("../passport-JWT/passportAuth");
const { RouterClass } = require("./routerClass");

const product = new ProductController()

class ProductRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], /* passportAuth("jwt"), */ product.get)
        this.get('/:pid', ['PUBLIC'], product.getById)
        this.post('/', ['PUBLIC'], /* passportAuth("jwt"), */ product.post)
        this.put('/:pid', ['PUBLIC'], product.update)
        this.delete('/:pid', ['PUBLIC'], product.delete)
    }
}

module.exports = ProductRouter