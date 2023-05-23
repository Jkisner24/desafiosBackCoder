const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const object = {
        title: "Add Products",
        script: "realtime.js"
    }
        
    res.render('realtimeproducts', object)
})

module.exports = router