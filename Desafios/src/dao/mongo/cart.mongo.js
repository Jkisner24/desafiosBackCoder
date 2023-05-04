const {cartModel} = require('./model/cart.model')

class CartManagerMongo{

    async getCarts(){
        try {
            return await cartModel.find({})
        } catch (error) {
            console.error(error)
        }

    }
    async getCartById(cid){
        try {
            return await cartModel.findOne({_id:cid})
        } catch (error) {
            console.error(error)
        }

    }
    async addCart(newCart){
        try {
            return await cartModel.create({
                status: 'created'
            })
        } catch (error) {
            console.error(error)
        }
    }
    async updateCart(){

    }
    async deleteCart(){

    }

}

module.exports = new CartManagerMongo