const {cartModel} = require('./model/cart.model')

class CartManagerMongo{

    newCart = async (data) => {
        try {
            return await cartModel.create(data)
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
    addProductInCart = async (info) => {
        try {
            const { cid, pid } = info;

            const cart = await cartModel.findOne({ _id: cid });

            const productIndex = cart.products.findIndex(product => product.idProduct === pid);

            if (productIndex === -1) {
                return await cartModel.updateOne({ _id: cid }, { $push: { products: { idProduct: pid, quantity: 1 } } });
            }

            return await cartModel.updateOne({ _id: cid, "products.idProduct": pid }, { $inc: { "products.$.quantity": 1 } })
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