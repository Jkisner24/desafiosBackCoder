const { generateToken } = require('../config/jwt')
const { userService, cartService } = require("../services");
const { isValidPassword } = require('../utils/bcryptHash');

class SessionController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await userService.getById({email});
      console.log(user);
      if(email === "" || password === "") throw({status:"error", message:"Fill in the missing fields"}) 

      if(!user) throw({status:"error", message:"Invalid email"})

      if(!isValidPassword(password, user)) throw({status:"error", password:"Invalid password"})

      let token = generateToken(user)
      req.token = token
      req.user = user
      req.user.role
      console.log("aca pasa");
      console.log(token);
      
      res
        .status(200)
        .cookie("coderCookieToken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .sendSuccess(`User logged success ${token}`)
      } catch (error) {
      console.log(error);
      res.status(500).sendServerError(error.message);
    }
  };
  logout = async (req, res) => {
    try {
      res.clearCookie("coderCookieToken").redirect("/api/views/session/login");
    } catch (error) {
      res.status(500).sendServerError(error.message);
    }
  };
  githubcallback = async (req, res) => {
    try {
      const userGitHub = await userService.getById(req.user.email);

      if (!userGitHub) {
        const { _id: cartId } = await cartService.newCart();

        const newUser = {
          first_name: req.user.name.split(" ")[0],
          last_name: req.user.name.split(" ")[1],
          email: req.user.email,
          password: req.user.password,
          cartId: cartId.toString(),
        };

        const { _id } = await userService.addUser(newUser);
        const token = generateToken({ user: _id.toString() });

        return res
          .status(200)
          .cookie("coderCookieToken", token, {
            maxAge: 60 * 60 * 100,
            httpOnly: true,
          })
          .sendSuccess(`user created ${token}`);
      }

      const { nonSensitiveUser: { userId, cartId, role, email, first_name, last_name } } = userGitHub//Separamos sus datos
      const token = generateToken({ user: { userId, cartId, role, email, first_name, last_name } })

      return res
        .status(200)
        .cookie("coderCookieToken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .redirect("/api/views/products");
    } catch (error) {
      if (error) return error;
    }
  }
  currentSession = async (req, res) => {
    try {
      const { email } = req.user;
      if (!req.user) res.status(401).send({ status: 'error', error: 'Unauthorized' })  
      if (!email) res.status(400).send({ status: 'error', error: 'Email not found in user object' })
      const user = await userService.getById({email});
      console.log(user);
      res.status(200).sendSuccess(user);
}catch (error) {
    return res.status(500).sendServerError(error.message);
  }}
}

module.exports = SessionController