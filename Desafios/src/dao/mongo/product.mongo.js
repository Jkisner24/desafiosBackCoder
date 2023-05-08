const { productModel } = require ('./model/product.model')

class ProductManagerMongo{
    
    getProducts = async ()=>{
        try {
            return await productModel.find({}).lean()
        } catch (error) {
            return new Error(error)
        }
    }
    getProductById = async (pid) =>{
        try {
            return await productModel.findOne({_id:pid})
        } catch (error) {
            return new Error(error)
        }

    }
    createProduct = async (newProduct) =>{
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    updateProduct = async(pid, newProduct) =>{
        try {
            return await productModel.updateOne({_id: pid},newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    deleteProduct = async(pid) =>{
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }
}



module.exports = new ProductManagerMongo