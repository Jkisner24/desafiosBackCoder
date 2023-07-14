const {cartModel} = require('./model/cart.model')
const {ticketModel} = require('./model/ticket.model')

class CartManagerMongo{

    newCart = async (newCart) => {
        try {
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }
    get = async() =>{
        try {
            return await cartModel.find({})
        } catch (error) {
            return new Error(error)
        }

    }
    getById = async (cidd) =>{
        try {
            return await cartModel.findOne({_id: cidd}).lean()
        } catch (error) {
            return new Error(error)
        }
    }

    update = async (cidd, newCart)=>{
        try {
            return await cartModel.findOneAndUpdate(
                {_id: cidd},
                {$set: {product: newCart}},
                {new: true})
        } catch (error) {
            return new Error(error)
        }
    }
    addProduct = async (cidd, pid, quantity) => {
        try {
            return await cartModel.findOneAndUpdate(
                {_id: cidd, "products.idProduct": pid},
                {$set: {"products.$.quantity": quantity }},
                {new: true})
        } catch (error) {
            return new Error(error)
        }
    }
    deleteCartProd = async (cidd, pid)=>{
        try{
            return await cartModel.findOneAndUpdate(
                {_id: cidd}, 
                {$pull: {products: {idProduct: pid}}},
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
    generateTicket = async(newTicket)=>{
        try {
            return await ticketModel.create(newTicket)
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = CartManagerMongo