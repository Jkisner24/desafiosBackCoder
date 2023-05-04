const CartManager = require("../dao/CartManager")
const ProductManager = require("../dao/ProductManager")


const carrito = new CartManager("../carrito.json")
const producto = new ProductManager("../products.json")


const getCarts = async (req, res)=>{
    try {
        const cart = await carrito.getCarts()
          res.status(200).send({cart})
    } catch (error) {
        console.log(error)
    }
}

const getCartsById = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await carrito.getCartsById(parseInt(cid))

        if(!cart) throw new Error('cart not found')

        res.status(200).send({cart})

    }catch(error){
        res.status(404).send({error: error.message})
    }
}

const createCart = async (req, res) => {
        
    const cart = req.body
    res.send({status: "Sucess", message: await carrito.addCart(cart)})

}


const addProductById = async (req, res) => {
    const id = parseInt(req.params.cid)
    const prod = parseInt(req.params.pid)
    
    const cart = await carrito.getCartsById(id)
    const arrayProductos =  await producto.getProducts()

    const productoEncontrado = cart.products.findIndex(pro => pro.id === prod)
    if (productoEncontrado !== -1) {
        cart.products[productoEncontrado].quantity += 1 
        await carrito.updateCart(id, cart)
        return res.status(200).send({ statusbar: 'success', message: 'product added'});
    }else{
        let prodExiste = arrayProductos.find(pd => pd.id === prod)
        if (!prodExiste) return res.send({error: 'Product not found'})
        let producto ={}
        producto.id = prod
        producto.quantity = 1
        cart.products.push(producto)
        await carrito.updateCart(id, cart)
        res.status(200).send({status: 'success', message: 'product added', carrito: carrito.productos})
    }
}


 
module.exports = { getCarts, getCartsById, createCart , addProductById }