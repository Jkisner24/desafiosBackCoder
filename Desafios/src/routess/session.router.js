const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const UserManager = require('../dao/mongo/user.mongo')

const router = Router()

router.post('/register', async (req, res) => {
    try {
        await UserManager.addUser(req.body)
            res.redirect('/session/login')
    } catch (error) {
        if(error){
            res.redirect('/session/register')
        }        
    }
})

router.post('/login', async (req, res)=> {
    const {email, password} = req.body
    const userDB = await UserManager.findOne({email, password})
    if (!userDB) return res.send({status: 'error', message: 'No existe ese usuario, revisar'})
    req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: 'admin'
    }
    res.send({
        status: 'success',
        message: 'login success',
        session: req.session.user
    })
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})

// sesiones 
// router.get('/counter', (req, res)=> {
//     if (req.session.counter) {
//         req.session.counter ++
//         res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
//     } else {
//         req.session.counter = 1
//         res.send('Bienvenido')
//     }
// })

// router.get('/privada', auth,(req,res) => {

//     res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
// })

module.exports = router
