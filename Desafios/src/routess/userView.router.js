const {Router} = require('express')
const router = Router()
const UserManager = require('../dao/mongo/user.mongo')
const { auth } = require('../middlewares/autenticacion.middleware')

router.get('/session', auth, async(req,res)=>{
    try {  
        const sessionObj = {
            pageTitle: 'Sessions',
            script: 'sessions.js',
            style: 'sessions.css'
        }
        if (!req.session.user) {
            renderSessionObj.showLogin = true
            return res.render('session', sessionObj)
        }
        renderSessionObj.showLogin = false
        res.render('session', renderSessionObj)
        
    } catch (error) {
        if (error) {
            res.status(400).send({
                status: 'Error',
                payload: error
            })
        }
    }
})

module.exports = router 