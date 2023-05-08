const {cartModel} = require('./model/cart.model')

class CartManagerMongo{

    async getCarts(){
        try {
            return await cartModel.find({})
        } catch (error) {
            return new Error(error)
        }

    }
    async getCartById(cid){
        try {
            return await cartModel.findOne({_id:cid})
        } catch (error) {
            return new Error(error)
        }
    }
    async addCart(){
        try {
            return await cartModel.create({
                status: 'created'
            })
        } catch (error) {
            console.error(error)
        }
    }
    async updateCart(cid, pid){
        try {
            let value = await cartModel.find({_id: cid, "products.id": pid},{"products.quantity":1, _id:0})
            console.log(`Valor del producto buscado: ${value}`)
            if (value !== null) {
                let newvalue = {...value} + 1
                console.log(`Cantidad nueva: ${newvalue}`)
                return await cartModel.findOneAndUpdate({_id: cid, "products.id": pid}, {$inc: {"products.$.quantity": 1}})
            }else{
                return await cartModel.updateOne({_id: cid}, {$push: { products:[{id: pid, quantity: 1}]}})
            }
        } catch (error) {
            return new Error(error)
        }
    }
    async deleteCart(cid){
        try {
            return await cartModel.deleteOne({_id: cid})
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = new CartManagerMongo