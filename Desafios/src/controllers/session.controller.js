const { generateToken } = require('../config/jwt')
const UserManager = require('../dao/mongo/user.mongo')
const userManager = new UserManager()

class SessionController {
    login = async (req, res) => {
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
    }
    register = async (req, res) => {
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
    }
    logout = async (req, res) => {
        try {
            res.clearCookie('coderCookieToken')
            res.redirect('/api/views/session/login')        
        } catch (error) {
            return `Error: ${error}`
        }
    }
/*     github = async(req, res) =>{
      
    }
 */
    githubcallback = async (req, res) => {
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
}

module.exports = SessionController