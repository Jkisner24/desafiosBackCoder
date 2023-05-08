const ProductManager = require("../dao/ProductManager")

const productManager = new ProductManager("../products.json")

const viewProductLive = (req, res) =>{
        
        let viewProductLive = {
            title: "Agregar productos",
            script: "realtime.js",
            style: "products.css"
            }
        res.render('realtimeprod', viewProductLive)
}

const viewProductStatic =  async(req, res) =>{
    try{
        res.render('home')
    }catch(error){
        console.log(error)
    }
}    

module.exports = {viewProductStatic, viewProductLive}

