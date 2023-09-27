const { generateToken, generateTemporaryToken } = require('../config/jwt')
const { userService } = require("../services");
const { isValidPassword, createHash } = require('../utils/bcryptHash');
const transport = require('../utils/mailer');
const config = require('../config/config')


class SessionController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getById({ email });
      console.log(user);
      if (email === "" || password === "")
        throw { status: "error", message: "Fill in the missing fields" };

      if (!user) throw { status: "error", message: "Invalid email" };

      if (!isValidPassword(password, user))
        throw { status: "error", password: "Invalid password" };

      let token = generateToken(user);
      req.token = token;
      req.user = user;
      req.user.role;
      req.user.cartId;

      res
        .status(200)
        .cookie("coderCookieToken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .sendSuccess(`User logged success ${token}`);
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
  githubcallback = async (req, res, next) => {
    let token = generateToken(req.user);
    res
      .status(200)
      .cookie("coderCookieToken", token, {
        maxAge: 60 * 60 * 100,
        httpOnly: true,
      })
      .redirect("/api/views/products");
  };
  currentSession = async (req, res) => {
    try {
      const { email } = req.user;
      if (!req.user)
        res.status(401).send({ status: "error", error: "Unauthorized" });
      if (!email)
        res
          .status(400)
          .send({ status: "error", error: "Email not found in user object" });
      const user = await userService.getById({ email });
      console.log(user);
      res.status(200).sendSuccess(user);
    } catch (error) {
      return res.status(500).sendServerError(error.message);
    }
  };

  restore = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.getById({ email });
      if (!user) {
        return res.status(404).sendUserError("Error changing password");
      }
      let tokenTemporary = generateTemporaryToken(user);
      req.user = user
      const URL = `http://localhost:8080/api/views/session/new-password`

      console.log(tokenTemporary)
      await transport.sendMail({
        from: config.GMAIL_EMAIL_ADMIN,
        to: email,
        subject: "Restore password",
        html: `<p>
                  A password change request has been made.
               </p>
               <p>
                  Please follow the link below to change your password:
               </p>
                 Follow the next link <a>${URL}</a>
                <p>
                This link has a short duration
                </p>`,
      })
      res.status(200)
      .cookie("coderCookieToken", tokenTemporary, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .sendSuccess(`email send ${tokenTemporary}`)

    } catch (error) {
      next(error);
    }
  };
  newPassword = async (req, res, next) => {
    try {
      const user = req.user
      console.log(user)
      const { password } = req.body;
      console.log({ password });
   
      if(!isValidPassword(password, user)){
      await userService.updateUser(user.user.userId, {password: await createHash(password)} );
      res.status(200).send({
        status: "Success",
        message: `Have you updated your password`,
      });
      }else {
        return res.status(400).send({
            status:"error", message:"You can not enter the same current password"
        })
    }

    } catch (error) {
      next(error);
    }
  }
}

module.exports = SessionController