const {Router} =require('express')
const productManager = require('../dao/mongo/product.mongo')

const router =  Router()

router.get('/', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        res.status(200).send({
            status: 'success',
            payload: products
        })
        
    } catch (error) {
        console.log(error) 
    }
})
router.get('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params
        let product = await productManager.getProductById(pid)
        res.status(200).send({
            status: 'success',
            payload: product
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req,res)=>{
    try {
        // hacer validaciones
        const newProduct = req.body

        let result = await productManager.createProduct(newProduct)
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})
router.put('/:pid',async (req,res)=>{

    try{
        const {pid} = req.params
        const newProduct = req.body
        let result = await productManager.updateProduct(pid, newProduct)
        res.status(200).send({
        status: 'success',
        payload: result
    })
    }catch(error){
        console.log(error)
    }
})
router.delete('/:pid', async (req,res)=>{
    try{
    const {pid} = req.params
    await productManager.deleteProduct(pid)
    res.status(200).send({
        status: 'success',
        payload: `Product with id ${pid} deleted`
    })
    }catch(error){
        console.log(error)
    }
})

module.exports = router
