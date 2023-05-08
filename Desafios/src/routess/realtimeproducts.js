const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const object = {
        title: "Agregar productos",
        script: "realtime.js"
    }
        
    res.render('realtimeproducts', object)
})

module.exports = router