const {Router} = require('express')
const passport = require('passport');
const UserManager = require('../dao/mongo/user.mongo')
const userManager = new UserManager()
const { passportAuth } = require('../passport-JWT/passportAuth');
const { authToken, generateToken } = require('../config/jwt');
const { authorization } = require('../passport-JWT/passportAuthorization');


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
/* 
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
 */
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

// login with session 

/* router.post("/login",
  passport.authenticate("login", { failureRedirect: "/api/views/session/login" }),
  async (req, res) => {
    try {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
      };
      if (req.user.email === "adminCoder@coder.com") {
        req.session.user.role = "admin";
        return res.redirect("/api/views/products");
      }
      req.session.user.role = "user";
      res.redirect("/api/views/products");
    } catch (error) {
      return `${error}`;
    }
  }
);
 */

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    if (email === 'adminCoder@coder.com') {
      req.body.role = "admin";
      const token = generateToken(req.body);
      return res.cookie('coderCookieToken', token, {
        maxAge: 60 * 60 * 100,
        httpOnly: true
      }).redirect('/api/views/products'); 
    }
    const userDB = await userManager.loginUser(req.body);
      res.cookie('coderCookieToken', userDB, {
      maxAge: 60 * 60 * 100,
      httpOnly: true 
    }).redirect('/api/views/products'); 
  } catch (error) {
    if (error) return res.status(401).send({
      status: 'Error',
      payload: error.message
    });
  }
});

router.post('/register', async (req, res) => {
  try {
      const { first_name, role, email, age } = await userManager.addUser(req.body)
      res.status(201).send({
          status: 'success',
          user: { first_name, role, email, age }
      })
  } catch (error) {
      if (error) {
          res.status(404).send({
              status: 'Error',
              payload: error.message
          })
      }
  }
})

router.get('/pruebas', passportAuth('current') , async (req, res) => {
  try {
      res.send({
          payload: "autorizado"
      })
  } catch (error) {
      return error
  }
})

//passportAuth to validate the user
//authorization to authorize the role 

router.get('/current', passportAuth('current') , authorization('user') , async (req, res) => {
  try {
      res.send(req.user)
  } catch (error) {
      return error
  }
})

router.post('/logout', async (req, res)=>{
    try {
        res.clearCookie('coderCookieToken')
        res.redirect('/api/views/session/login')        
    } catch (error) {
        return `Error: ${error}`
    }
})


//github
/* router.get('/github', passport.authenticate('github', {
    scope: ['user: email']
}))
 */
router.get(
  "/githubcallback",
  passport.authenticate('github', {
    failureRedirect: "/api/views/session/login",
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user)
      res
        .cookie("coderCookieToken", token, {
          maxAge: 60 * 60 * 100,
          httpOnly: true,
        })
        .redirect("/api/views/products");
    } catch (error) {
      if (error) return error;
    }
  }
);


module.exports = router
