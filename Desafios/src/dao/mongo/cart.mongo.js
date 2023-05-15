const {cartModel} = require('./model/cart.model')

class CartManagerMongo{

    newCart = async () => {
        try {
            return await cartModel.create({products: []})
        } catch (error) {
            return new Error(error)
        }
    }
    getCarts = async() =>{
        try {
            return await cartModel.find({})
        } catch (error) {
            return new Error(error)
        }

    }
    getCartById = async (cid) =>{
        try {
            return await cartModel.findOne({_id:cid})
        } catch (error) {
            return new Error(error)
        }
    }
    addProductInCart = async (params, body) => {
        try {
            const { cidd, pid } = params;
            const { quantity } = body;
            
            const cartFound = await cartModel.findOne({_id: cidd, "products.idProduct": pid})

            if(cartFound){
                return await cartModel.updateOne({ _id: cidd, "products.idProduct": pid }, {$inc: { "products.$.quantity": quantity } })
            }else{
                return await cartModel.updateOne({_id: cidd}, {$push: { products: {idProduct: pid, quantity: quantity}}})

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

module.exports = new CartManagerMongo()