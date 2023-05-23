const {Router} = require('express')
const router = Router()
const { cartModel } = require('../dao/mongo/model/cart.model')


router.get('/carts/:cidd', async(req, res) =>{   
    const { cidd } = req.params
    let result = await cartModel.findById(cidd).lean()
    res.render('carts', result)
})

module.exports = router
  