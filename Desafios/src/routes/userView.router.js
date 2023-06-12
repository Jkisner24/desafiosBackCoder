const {Router} = require('express')
const { passportAuth } = require('../passport-JWT/passportAuth')
const router = Router()

router.get('/session/register',  (req, res) => {
    const renderRegisterObj = {
        title: 'registro',
        script: 'sessions.js',
    }
    res.status(200).render('register', renderRegisterObj)
})

router.get('/session/login', (req, res) => {
    const renderLoginObj = {
        title: 'Login',
        script: 'sessions.js',
    }
    res.status(200).render('login', renderLoginObj)
})

router.get('/session/profile', passportAuth('jwt'), (req, res) => {
    const { first_name, last_name } = req.user
    const renderProfileObj = {
        title: 'Perfil',
        script: 'sessions.js',
        first_name,
        last_name
    }
    res.status(200).render('profile', renderProfileObj)
})

router.get('/session/logout', passportAuth('jwt'), (req, res) => {
    const renderLoginObj = {
        title: 'Logout',
        script: 'sessions.js',
    }
    res.status(200).render('login', renderLoginObj)
})



module.exports = router 