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

        try {
            const carts = await this.getCarts();
            this.carts = carts

            if(this.carts.length === 0){
                newCart.id = 1
            }else{
                newCart.id = this.carts[this.carts.length - 1].id + 1
            }

            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                this.appendCart()
            }

            return [];
        

        } catch (error) {
            console.log(error);
        }
    }

    getCarts = async () =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            if (data.length === 0) return [];
            const parseData = JSON.parse(data)
            return parseData
        } catch (error) {
            console.log(error)
        }
    }

    getCartsById = async(id) =>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const readToObject = JSON.parse(data)
            if (!readToObject[id - 1]) {
                throw new Error('cart not found')
            }
            return readToObject[id - 1]
        } catch (error) {
            console.log(error);
        }
    }
    updateCart = async (cid, data) => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parseCarts = JSON.parse(getFileCarts);
            
            if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };

            const findId = parseCarts.findIndex(product => product.id == cid)
            if (findId === -1) return { status: "error", message: 'No se encontró el id' };


            this.carts = parseCarts.map(element => {
                if(element.id == cid){
                    element = Object.assign(element, data);
                   return element
                }
                return element
            })
            

            const toJSON = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, toJSON)
            return returnedTarget
        }
        catch (err) {
            console.log(err);
        }

    }

}

module.exports = CartManager;
