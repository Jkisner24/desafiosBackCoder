
class ProductRepository {
  //este dao ya está instanciado en index.js de services 
    constructor(dao) {
      this.dao = dao;
    }
  
    paginate = async (query, options) => {
      try {
        return await this.dao.get(query, options);
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
    productCreate = async (newProduct) => {
      try {
        return await this.dao.create(newProduct);
      } catch (error) {
        throw error;
      }
    }    
    productUpdate = async (pid, newProduct) => {
      try {
        return await this.dao.update({_id: pid}, newProduct);
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
  
  module.exports = ProductRepository;
  
  