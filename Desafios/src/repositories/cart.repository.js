
class CartRepository{
    constructor(dao){
        this.dao = dao
    }
    newCart = async() =>{
        try {
            return await this.dao.newCart()
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
    update = async(cidd, pid, quantity) =>{
        try{
            return await this.dao.addProduct(cidd, pid, quantity)
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
    purchase = async(newTicket) =>{
        try{
            return await this.dao.purchase(newTicket)
        } catch (error) {
            throw error
        }
    }

}

module.exports = CartRepository