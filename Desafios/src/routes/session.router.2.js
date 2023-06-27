const passport = require('passport');
const SessionController = require("../controllers/session.controller");
const { passportAuth } = require("../passport-JWT/passportAuth");
const { RouterClass } = require("./routerClass");

const session = new SessionController()

class SessionRouter extends RouterClass {
    init() {
        this.post('/login', ['PUBLIC'], session.login)
        this.post('/register', ['PUBLIC'], session.register)
        this.post('/logout', ['PUBLIC'], /* passportAuth('jwt'), */ session.logout) 
        this.get('/github', ['PUBLIC'], passport.authenticate('github', { scope: ['user: email'] }))
        this.get('/githubcallback', ['PUBLIC'], passport.authenticate('github', { failureRedirect: '/api/views/session/login'
        } ), session.githubcallback)
    }
}

module.exports = SessionRouter
