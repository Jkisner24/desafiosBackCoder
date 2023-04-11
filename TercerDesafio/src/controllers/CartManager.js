const fs = require('fs');

let carrito = [] 

class CartManager{
    constructor(path){
        this.carts = carrito
        this.path = path
    }

    appendCart = async() =>{
        const toJSON = JSON.stringify(this.carts, null, 3);
        await fs.promises.writeFile(this.path, toJSON)
    }

    addCart = async (newCart)=> {

        if(this.carts.length === 0){
            this.carts.push({id: 1, ...newCart})
            this.appendCart()
            return "cart ok"

        }
        if(this.carts.length !== 0){
            this.carts.push({ id: this.carts[this.carts.length - 1].id + 1, ...newCart})
            this.appendCart()
            return "Prod oka"
        }
    }

    addToCart = async (cid, pid) => {
        try {
            if(this.exists(this.archivo)) {
                const carts = await this.readFile(this.archivo)
                const cart = carts.find(item => item.id === cid)
                console.log(cart);
            if(cart) {
                const addProduct = cart.products.find(item => item.id === pid)
                if(addProduct) {
                    addProduct.quantity++
                }else{
                    cart.products.push({id: pid, quantity: 1 })
                }
                await this.writeFile(carts)
                return cart
            }
            throw new Error(`The cart with the id was not found: ${cid}`)
        }
        } catch (error) {
            console.log(error);
        }
    }


    getCarts = async () =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const parseData = JSON.parse(data)
            return parseData
        } catch (error) {
            console.log(error)
        }
    }

    getCartsById = async(id) =>{
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8');
            const readToObject = JSON.parse(getFileCarts)
            const carts = readToObject.find(cart => cart.id === id)
            return carts         
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManager;
