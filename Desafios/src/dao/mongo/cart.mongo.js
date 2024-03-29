const {cartModel} = require('./model/cart.model')
const {ticketModel} = require('./model/ticket.model')

class CartManagerMongo{

    newCart = async () => {
        try {
            return await cartModel.create({})
        } catch (error) {
            return new Error(error)
        }
    }
    get = async() =>{
        try {
            return await cartModel.find({}).lean()
        } catch (error) {
            return new Error(error)
        }

    }
    getById = async(cidd) =>{
        try {
          const cart = await cartModel.findOne({_id: cidd}).lean();
          console.log(cart)
          return cart;
        } catch (error) {
          console.error("Error al obtener el carrito:", error.message);
          throw error; 
        }
      }
    addProduct = async (cidd, pid, quantity) => {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cidd }, 
                { $push: { products: { product: pid, quantity: quantity } } },
                {new: true})
        } catch (error) {
                 return new Error(error)
        }
    }

    deleteCartProd = async (cidd, pid)=>{
        try{
            return await cartModel.findOneAndUpdate(
                {_id: cidd}, 
                {$pull: {products: {product: pid}}},
                {new: true})
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
    emptyCart = async(cidd)=>{
        try {
            return await cartModel.findOneAndUpdate(
                {_id: cidd}, 
                {$set: {products:[]}}, 
                {new: true})
        } catch (error) {
            return new Error(error)
        }
    }
    purchase = async(newTicket)=>{
        try {
            return await ticketModel.create(newTicket)
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = CartManagerMongo