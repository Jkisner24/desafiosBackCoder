const fs = require('fs');

    
class CartManager{
    constructor(path){
        this.carts = []
        this.path = path
    }

    readCartFile = async () =>{
        
        const data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }

    writeFile = async () =>{
        const toJson = JSON.stringify(this.carts, null, 3);
        await fs.promises.writeFile(this.path, toJson)

    }

    getCarts = async() => {
        try{
            return await this.readCartFile()
        }
        catch (error){
            return new Error(error)
        }
    }

    getCartsById = async (id) => {
        try {
            this.carts = await this.readCartFile()
            return this.carts.find(car => car.id === id)
        }catch (error){
            return new Error(error) 
        }
    }


    addCart = async (newCart)=> {
        try {
            this.carts = await this.getCarts();

            if(this.carts.length === 0){
                newCart.id = 1
            }else{
                newCart.id = this.carts[this.carts.length - 1].id + 1
            }

            newCart.products = []
            this.carts.push(newCart)
          
            this.writeFile()
            return 'cart created'
        }catch (error){
            return new Error(error)
        }
	}
	
    updateCart = async (id, updCart) => {
        try {
            const parseCarts = await this.readCartFile()
            const findId = parseCarts.findIndex(ct => ct.id == id)
            if (findId === -1) return { status: "error", message: 'Id carrito no existe' }
            const returnedTarget = Object.assign(parseCarts[id - 1], updCart)
            parseCarts[id - 1] = returnedTarget
            this.cart = parseCarts
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts,'utf-8','\t'))
            return 'Carrito Actualizado'
            }
        catch (error){
            return new Error(error)
        }
    }

}

module.exports = CartManager;
