const {Router} = require('express')
const router = Router()
const { auth } = require('../middlewares/autenticacion.middleware')

router.get('/session', auth, async(req,res)=>{
    try {  
        const sessionObj = {
            pageTitle: 'Sessions',
            script: 'sessions.js',
            style: 'sessions.css'
        }
        if (!req.session.user) {
            sessionObj.showLogin = true
            return res.render('session', sessionObj)
        }
        sessionObj.showLogin = false
        res.render('session', sessionObj)
        
    } catch (error) {
        if (error) {
            res.status(400).send({
                status: 'Error',
                payload: error
            })
        }
    }
})

router.get('/session/register', auth, (req, res) => {
    const renderRegisterObj = {
        title: 'registro',
        script: 'sessions.js',
        style: 'sessions.css'
    }
    if (req.session.user) {
        renderRegisterObj.showForm = false
        return res.render('register', renderRegisterObj)
    }
    renderRegisterObj.showForm = true
    res.status(200).render('register', renderRegisterObj)
})

router.get('/session/login', auth, (req, res) => {
    const renderLoginObj = {
        title: 'Login',
        script: 'sessions.js',
        style: 'sessions.css'
    }
    res.status(200).render('login', renderLoginObj)
})

router.get('/session/profile', auth, (req, res) => {
    const { first_name, last_name } = req.session.user
    const renderProfileObj = {
        title: 'Perfil',
        script: 'sessions.js',
        style: 'sessions.css',
        first_name,
        last_name,
        
    }
    res.status(200).render('profile', renderProfileObj)
})

router.get('/session/logout', auth, (req, res) => {
    const renderLoginObj = {
        title: 'Logout',
        script: 'sessions.js',
        style: 'sessions.css'
    }
    res.status(200).render('login', renderLoginObj)
})



module.exports = router 