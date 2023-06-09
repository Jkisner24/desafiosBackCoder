const {Router} = require('express')
const router = Router()
const { productModel } = require("../dao/mongo/model/product.model")
const { passportAuth } = require('../passport-JWT/passportAuth')


router.get('/products', passportAuth('jwt'), async(req, res) =>{   
  try {
    const { first_name, last_name, role } = req.user
    console.log(req.user)

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let sort = req.query.sort
    
    if(!page) page = 1
    if(!limit) limit = 4
    if(!sort ) sort = "asc"
    const result = await productModel.paginate({},
      {
      page,
      limit,
      sort,
      lean:true,
    })
    result.showLogin = false;
    result.first_name = first_name;
    result.last_name = last_name;
    result.role = role;

    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/views/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/views/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    console.log(result)


    res.render('products', result)

    
  } catch (error) {
      return res.status(500).send(error)
  }
})

module.exports = router