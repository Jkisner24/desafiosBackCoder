const { productService } = require("../services")
const {CustomErrors} = require("../services/errors/CustomErrors");
const logger = require('../config/logger.js')
const productEnumError = require("../services/errors/enumError")
const { nullOrEmptyValues, repetedProductError } = require("../services/errors/productsErrorMessage")

class ProductController {
  get = async (req, res) => {
    try {
      const productsInDb = await productService.getProducts()
      const products = productsInDb.docs
      res.status(200).sendSuccess(products)
    } catch (error) {
      logger.error(error)
      res.status(400).sendServerError(error.message)
    }
  };
  getById = async (req, res) => {
    try {
      const { pid } = req.params;
      const productInDb = await productService.getById(pid)
      res.status(200).sendSuccess(productInDb)
    } catch (error) {
      logger.error(error)
      res.status(400).sendServerError(error.message)
    }
  };

  post = async (req, res, next) => {
    try {
      const { title, description, price, code, stock, category, thumbnail } = req.body
      const owner = req.user.user.email

      if (!title.trim() || !description || !price || !code || !stock || !category || !thumbnail )
        CustomErrors.productError({
          name: "Product Creation Error",
          code: productEnumError.UNDEFINED_OR_NULL_VALUES,
          cause: nullOrEmptyValues(req.body),
          message: 'Error trying to create a new product.'
      })

      const findProduct = await productService.getByCode(code)
        if(findProduct){
          CustomErrors.productError({
            name: 'Product Creation Error',
            code: productEnumError.REPETED_PRODUCT,
            cause: repetedProductError(req.body),
            message: 'Error trying to create a new product.'
        })
        }
        const newProduct = {
          title, 
          description,
          price, 
          code, 
          stock, 
          category,
          thumbnail,
          owner
        }
      let result = await productService.productCreate(newProduct)
      res.status(200).sendSuccess({
        message: "success",
        result,
      });
    } catch (error) {
      next(error)
    }
  };
  update = async (req, res, next) => {
    try {
      const { pid } = req.params
      const newProduct = req.body
      let result = await productService.updateProduct(pid, newProduct)
      console.log(result)
      if(!result) {
        CustomErrors.productError({
        name: "Can't update product",
        code: productEnumError.UNDEFINED_OR_NULL_VALUES,
        cause: nullOrEmptyValues(product),
        message: "Can't modify product because product doesn't exists"
      })
      }
      res.status(200).sendSuccess({
        result,
        message: 'Product update success'
      });
    } catch (error) {
      next(error)
    }
  };
  delete = async (req, res) => {
    try {
      const { pid } = req.params;
      let deleteProduct = await productService.deleteProduct(pid);
      res.status(200).sendSuccess({
        deleteProduct,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).sendServerError(error.message)
    }
  };
}

module.exports = ProductController