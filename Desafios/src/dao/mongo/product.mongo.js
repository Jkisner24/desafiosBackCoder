const { productModel } = require ('./model/product.model')

class ProductManagerMongo{
    
    get = async (page, sort) => {
        try {
            let sortOpt = {}

            if(sort === "asc"){
                sortOpt = {price : 1}
            } else if (sort === "des") {
                sortOpt = {price : -1}
            }

            return await productModel.paginate({}, {limit: 4, page: page , lean: true, sort: sortOpt})
        } catch (error) {
              throw new Error(error);
        }
    }
    getById = async (pid) =>{
        try {
            return await productModel.findOne({_id:pid}).lean()
        } catch (error) {
            throw new Error(error);
        }

    }
    getProductByCode = async (code) => {
        try {
            return await productModel.findOne({ code: code })
        } catch (error) {
            throw error
        }
    }
    create = async (newProduct) =>{
        try {
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    update = async(pid, changes) =>{
        try {
            return await productModel.updateOne({_id: pid}, changes)
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