
class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    paginate = async (query, options) => {
      try {
        return await this.dao.paginateProducts(query, options);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = ProductRepository;
  
  