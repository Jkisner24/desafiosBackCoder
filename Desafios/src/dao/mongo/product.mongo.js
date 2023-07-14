const { productModel } = require ('./model/product.model')

class ProductManagerMongo{
    
    get = async (query, options) => {
        try {
          return await productModel.paginate(query, options);
        } catch (error) {
          throw new Error(error);
        }
    }
    getById = async (pid) =>{
        try {
            return await productModel.findOne({_id:pid})
        } catch (error) {
            throw new Error(error);
        }

    }
    create = async (newProduct) =>{
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    update = async(pid, newProduct) =>{
        try {
            return await productModel.updateOne({_id: pid}, newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    delete = async(pid) =>{
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }
}



module.exports = ProductManagerMongo