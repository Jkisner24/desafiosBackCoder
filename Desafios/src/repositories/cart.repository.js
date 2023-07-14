
class CartRepository{
    constructor(dao){
        this.dao = dao
    }
    newCart = async(newCart) =>{
        try {
            return await this.dao.newCart(newCart)
        } catch (error) {
            throw error
        }
    }
    getCarts = async() =>{
        try{
            return await this.dao.get()
        } catch (error) {
            throw error
        }
    }
    getById = async(cidd) =>{
        try{
            return await this.dao.getById(cidd)
        } catch (error) {
            throw error
        }
    }

    updateCarts = async(cidd, newCart) =>{
        try{
            return await this.dao.update(cidd, newCart)
        } catch (error) {
            throw error
        }
    }
    update = async(cidd, pid, quantity) =>{
        try{
            return await this.dao.updateProduct(cidd, pid, quantity)
        } catch (error) {
            throw error
        }
    }
    deleteCartProd = async(cidd, pid) =>{
        try{
            return await this.dao.deleteCartProd(cidd, pid)
        } catch (error) {
            throw error
        }
    }
    deleteCartById = async(cidd) =>{
        try{
            return await this.dao.deleteCartById(cidd)
        } catch (error) {
            throw error
        }
    }
    emptyCart = async(cidd) =>{
        try{
            return await this.dao.emptyCart(cidd)
        } catch (error) {
            throw error
        }
    }
    generateTicket = async(newTicket) =>{
        try{
            return await this.dao.generateTicket(newTicket)
        } catch (error) {
            throw error
        }
    }

}

module.exports = CartRepository