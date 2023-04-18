const ProductManager = require("../controllers/ProductManager")

const producto = new ProductManager("../products.json")

const viewProductStatic = async(req, res) =>{
    
    const prodList =  await producto.getProducts()

    let datosProd = {
        listaProductos: prodList,
        style: 'index.css'
    }
    res.render('home', datosProd)
}

const viewProductLive =  async(req, res) =>{
    
    const prodList =  await producto.getProducts()

    let datosProd = {
        listaProductosLive: prodList
    }
    res.render('realtimeprod', datosProd)
}


module.exports = {viewProductStatic, viewProductLive}

/* const getViews = async (req, res) =>{
 */
/* let food = [
    {   name: 'hambuguesa',
        price: 150
    },
    {   name: 'pizza',
        price: 100
    },
    {   name: 'panchito',
        price: 25   
    },
    {   name: 'lomo',
        price: 500
    }

]

let users = [
    {
        name: 'Jose',
        apellido: 'Suarez',
        role: 'admin'
    },
    {
        name: 'Carlos',
        apellido: 'Sosa',
        role: 'admin'
    },
    {
        name: 'Manuel',
        apellido: 'Perez',
        role: 'user'
    },
    {
        name: 'Maria',
        apellido: 'Gomez',
        role: 'user'
    }

]

    let user = users[Math.floor(Math.random() * users.length)]
    let testUser = {
        user,
        isAdmin: user.role === 'admin',
        food,
        style: 'index.css'
    }
    res.render('index', testUser)
} */
