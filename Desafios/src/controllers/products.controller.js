const { productService } = require("../services")

class ProductController {
  get = async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).send({
        status: "success",
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (req, res) => {
    try {
      const { pid } = req.params;
      let product = await productService.getProductById(pid);
      res.status(200).send({
        status: "success",
        payload: product,
      });
    } catch (error) {
      console.log(error);
    }
  };

  post = async (req, res) => {
    try {
      const newProduct = req.body;

      let result = await productService.createProduct(newProduct);
      res.status(200).send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  put = async (req, res) => {
    try {
      const { pid } = req.params;
      const newProduct = req.body;
      let result = await productService.updateProduct(pid, newProduct);
      res.status(200).send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  delete = async (req, res) => {
    try {
      const { pid } = req.params;
      let deleteProduct = await productService.deleteProduct(pid);
      res.status(200).send({
        deleteProduct,
        payload: `Product with id ${pid} deleted`,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductController