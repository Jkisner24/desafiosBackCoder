const ProductManager = require("../controllers/ProductManager")

const producto = new ProductManager("../products.json")

const viewProductStatic = async(req, res) =>{
    try{
        const prodList =  await producto.getProducts()

        let datosProd = {
            listProducts: prodList,
            style: 'index.css'
        }
        res.render('home', datosProd)
    }catch(error){
        console.log(error)
    }
}

const viewProductLive =  async(req, res) =>{
    try{
        const prodList =  await producto.getProducts()

        let datosProd = {
            listProdLive: prodList
        }
        res.render('realtimeprod', datosProd)
    }catch(error){
        console.log(error)
    }

}

module.exports = {viewProductStatic, viewProductLive}

