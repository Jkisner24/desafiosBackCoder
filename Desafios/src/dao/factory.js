const { PERSISTENCE } = require("../config/config");
const configServer = require("../config/configServer");
let ProductDao
let UserDao
let CartDao


switch(PERSISTENCE){
    case 'MONGO': 
        configServer.connectDb()
        const ProductDaoMongo = require('../dao/mongo/product.mongo')
        const UserDaoMongo = require('../dao/mongo/user.mongo')
        const CartDaoMongo = require('../dao/mongo/cart.mongo')

        ProductDao = ProductDaoMongo
        UserDao = UserDaoMongo
        CartDao = CartDaoMongo
        break;
    case 'FILE':
        const ProductDaoFile = require('../dao/fileSystem/ProductManager')
        const CartDaoFile = require('../dao/fileSystem/CartManager')

        ProductDao = ProductDaoFile
        CartDao = CartDaoFile
        break;
    default: 
        break
}


module.exports ={
    ProductDao,
    UserDao,
    CartDao
}