const {Router} = require('express')
const router = Router()
const { productModel } = require("../dao/mongo/model/product.model")
const { cartModel } = require('../dao/mongo/model/cart.model')

router.get('/products', async(req, res) =>{   
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let sort = req.query.sort
  if(!page) page = 1
  if(!limit) limit = 4
  if(!sort ) sort = "asc"
  let result = await productModel.paginate({},{page,limit,sort, lean:true})
  result.prevLink = result.hasPrevPage?`http://localhost:8080/api/products?page=${result.prevPage}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8080/api/products?page=${result.nextPage}`:'';
  result.isValid= !(page<=0||page>result.totalPages)
  res.render('products', result)
})

router.get('/carts/:cidd', async(req, res) =>{   
  const { cidd } = req.params
  let result = await cartModel.findById(cidd).lean()
  res.render('carts', result)
})

module.exports = router