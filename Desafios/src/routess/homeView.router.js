const {Router} = require('express')
const router = Router()
const productMongo = require('../dao/mongo/product.mongo')

router.get('/', async(req,res)=>{
    try {  
        const products = await mongoManager.getProduct()

        const object = {
            products,
        }
        res.render('home', object)
        
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router 