const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const UserManager = require('../dao/mongo/user.mongo')

const router = Router()

router.post('/register', async (req, res) => {
    try {
        await UserManager.addUser(req.body)
            res.redirect('/api/views/session/login')
    } catch (error) {
        if(error){
            res.redirect('/api/views/session/register')
        }        
    }
})

router.post('/login', async (req, res)=> {
    try {
        const userDB = await UserManager.loginUser(req.body)
        if (!userDB) {
            throw new Error('Error auth');
          }
            req.session.user = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            }
        if (userDB.email === 'adminCoder@coder.com') {
            req.session.user.role = 'admin';
            return res.redirect('/api/views/products');
          }
        req.session.user.role = 'user';
        return res.redirect('/api/views/products');
      
    } catch (error) {
        return res.redirect('/api/views/session/login');
    }
})

router.post('/logout', async (req, res)=>{
    try {
        req.session.destroy()
        res.redirect('/api/views/session/login')        
    } catch (error) {
        return `Error: ${error}`
    }
})

module.exports = router
