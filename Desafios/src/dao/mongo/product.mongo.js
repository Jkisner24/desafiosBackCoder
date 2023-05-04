const { productModel } = require ('./model/product.model')

class ProductManagerMongo{
    
    async getProducts(){
        try {
            return await productModel.find({})
        } catch (error) {
            return new Error(err)
        }
    }
    async getProductById(pid){
        try {
            return await productModel.findOne({_id:pid})
        } catch (error) {
            return new Error(err)
        }

    }
    async addProduct(newProduct){
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(err)
        }
    }
    async updateProduct(){


    }
    async deleteProduct(){

    }

}

module.exports = new ProductManagerMongo