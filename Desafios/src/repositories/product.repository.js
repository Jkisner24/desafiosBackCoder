
class ProductRepository {
  //este dao ya está instanciado en index.js de services 
    constructor(dao) {
      this.dao = dao;
    }
  
    getProducts = async (data) => {
      try {
        return await this.dao.get(data);
      } catch (error) {
        throw error;
      }
    }
    getById = async (pid) => {
      try {
        return await this.dao.getById(pid);
      } catch (error) {
        throw error;
      }
    }    
    getByCode = async (pCode) => {
      try {
        return await this.dao.getProductByCode(pCode)
      } catch (error) {
        throw error;
      }
    }    
    productCreate = async (newProduct) => {
      try {
        return await this.dao.create(newProduct)
      } catch (error) {
        throw error;
      }
    }    
    updateProduct = async (pid, updateBody) => {
      try {
        return await this.dao.update(pid, updateBody)
      } catch (error) {
        throw error;
      }
    }    
    productDelete = async (pid) => {
      try {
        return await this.dao.delete(pid);
      } catch (error) {
        throw error;
      }
    }    
  } 
  
  module.exports = ProductRepository
  
  