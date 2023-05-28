const {Router} = require('express')
const router = Router()
const { auth } = require('../middlewares/autenticacion.middleware')

router.get('/session/register', auth, (req, res) => {
    const renderRegisterObj = {
        title: 'registro',
        script: 'sessions.js',
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
    }
    res.status(200).render('login', renderLoginObj)
})

router.get('/session/profile', auth, (req, res) => {
    const { first_name, last_name } = req.session.user
    const renderProfileObj = {
        title: 'Perfil',
        script: 'sessions.js',
        first_name,
        last_name,
    }
    res.status(200).render('profile', renderProfileObj)
})

router.get('/session/logout', auth, (req, res) => {
    const renderLoginObj = {
        title: 'Logout',
        script: 'sessions.js',
    }
    res.status(200).render('login', renderLoginObj)
})



module.exports = router 