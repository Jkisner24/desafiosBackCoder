const CartManager = require("../controllers/cartManager")

const carts = new CartManager("../cart.json")


const getCartsById = async (req, res) => {
    const { cid } = req.params
    try {
        const valueReturned = await carts.getCartsById(cid)
        if (valueReturned.error) return res.status(200).send({ status: 'Sin carritos', valueReturned })

        res.status(200).send({ status: 'Carrito', valueReturned })
    }
    catch (err) {
        res.status(400).send({ status: 'error router', err })
    }

}

const createCart = async (req, res) => {
    try {
        const cart = req.body

        const campoVacio = Object.values(cart).find(value => value === '')
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: "Falta completar algún campo" })
        }

        if (cart.status === 'error') return res.status(400).send({ valueReturned })
        await carts.addCart(cart)
        res.status(200).send({ cart })
    }
    catch (err) {
        console.log(err);
    }

}

const addProductById = async (req, res) => {
    try {   
        let { producto } = req.body
        const { cid, pid } = req.params

        producto['idProduct'] = Number(pid)

        const carrito = await carts.getCartById(cid)
        if (carrito.error) return res.status(400).send({ carrito })

        let productoEncontrado = carrito.productos.findIndex(productos => productos.idProduct == pid)
        if (productoEncontrado !== -1) {
            carrito.productos[productoEncontrado].cantidad = Number(carrito.productos[productoEncontrado].cantidad) + Number(producto.cantidad)
            await carts.updateCart(cid, carrito)
            return res.status(200).send({ statusbar: 'success', message: 'producto agregado'});
        }
        carrito.productos.push(producto)
        await carts.updateCart(cid, carrito)
        res.status(200).send({status: 'success', message: 'producto agregado', carrito: carrito.productos})
    
    } catch (err) {
        return res.status(400).send({ status: "error", message: 'error de parametros' })
    }

}

 
module.exports = { getCartsById, createCart , addProductById }