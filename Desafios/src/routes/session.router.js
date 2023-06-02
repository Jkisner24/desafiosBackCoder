const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const UserManager = require('../dao/mongo/user.mongo')
const passport = require('passport')


const router = Router()

/* router.post('/register', async (req, res) => {
    try {
        await UserManager.addUser(req.body)
            res.redirect('/api/views/session/login')
    } catch (error) {
        if(error){
            res.redirect('/api/views/session/register')
        }        
    }
}) */

//register estrategia en passport.config 

router.post("/register",
  passport.authenticate('register', {
    failureRedirect: "/api/views/session/register",
    successRedirect: "/api/views/session/login",
  }),
  async (req, res) => {
    try {
      res.send({
        status: "success",
        msg: "Registered",
      });
    } catch (error) {
      if (error) return error;
    }
  }
);

/* router.post('/login', async (req, res)=> {
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
 */
router.post("/login",
  passport.authenticate("login", { failureRedirect: "/api/views/session/login" }),
  async (req, res) => {
    try {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
      };
      if (req.user.email === "adminCoder@coder.com") {
        req.session.user.rol = "admin";
        return res.redirect("/api/views/products");
      }
      req.session.user.rol = "user";
      res.redirect("/api/views/products");
    } catch (error) {
      return `${error}`;
    }
  }
);

router.post('/logout', async (req, res)=>{
    try {
        req.session.destroy()
        res.redirect('/api/views/session/login')        
    } catch (error) {
        return `Error: ${error}`
    }
})

//github
router.get('/github', passport.authenticate('github', {
    scope: ['user: email']
}))
router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/api/views/session/login'
}), async (req, res) => {
    try {
        req.session.user = req.user
        res.redirect('/api/views/products')
    } catch (error) {
        if (error) return error
    }
})


module.exports = router
