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
    getCartById = async (cidd) =>{
        try {
            return await cartModel.findOne({_id:cidd})
        } catch (error) {
            return new Error(error)
        }
    }

    updateCart = async (params)=>{
        try {
            const { cidd, pid } = params;
            const cartFound = await cartModel.findOne({_id: cidd, "products.idProduct": pid})
            if(cartFound){
                return await cartModel.updateOne({_id: cidd, "products.idProduct": pid}, {$inc: { "products.$.quantity": 1}})          
            }else{
                return await cartModel.updateOne({_id: cidd}, {$push: { products: {idProduct: pid, quantity: 1}}})
            }
        } catch (error) {
            
        }
    }
    addProductInCart = async (params, body) => {
        try {
            const { cidd, pid } = params;
            const { quantity } = body;
            
            const cartFound = await cartModel.findOne({_id: cidd, "products.idProduct": pid})

            if(cartFound){
                return await cartModel.findOne({ _id: cidd, "products.idProduct": pid }, {$set: { "products.$.quantity": quantity } })
            }
        } catch (error) {
            return new Error(error)
        }
    }
    deleteCartProd = async (params)=>{
        try{
            const { cidd, pid } = params;
            return await cartModel.findOneAndUpdate({_id: cidd}, {$pull: {products: {idProduct: pid}}},{new: true} )

        }catch(error){
            return new Error(error)
        }
    }
    deleteCartById = async (cidd)=>{
        try {
            return await cartModel.deleteOne({_id: cidd})
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = CartManagerMongo