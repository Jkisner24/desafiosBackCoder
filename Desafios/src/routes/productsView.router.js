const {Router} = require('express')
const router = Router()
const { productModel } = require("../dao/mongo/model/product.model")
const {auth} = require('../middlewares/autenticacion.middleware')


router.get('/products', auth, async(req, res) =>{   
  try {
    if(!req.session.user){
        return res.redirect('/api/views/session/login')
    }
    const {first_name, last_name, role} = req.session.user

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let sort = req.query.sort
    if(!page) page = 1
    if(!limit) limit = 4
    if(!sort ) sort = "asc"
    let result = await productModel.paginate({},
      {
      page,
      limit,
      sort,
      lean:true,
      first_name,
      last_name,
      role 
    }
      )
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/views/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/views/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    
    res.render('products', result)
    
  } catch (error) {
      return res.status(500).send(error)
  }
})

module.exports = router