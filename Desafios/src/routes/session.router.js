const passport = require('passport');
const SessionController = require("../controllers/session.controller");
const { RouterClass } = require("./routerClass");
const { passportAuth } = require('../passport-JWT/passportAuth');

const session = new SessionController()

class SessionRouter extends RouterClass {
    init() {
        this.post('/login', ['PUBLIC'], session.login)
        this.post('/logout', ['PUBLIC'], session.logout) 
        this.get('/github', ['PUBLIC'], passport.authenticate('github', { scope: ['user: email'] }))
        this.get('/githubcallback', ['PUBLIC'], passport.authenticate('github', { failureRedirect: '/api/views/session/login'
        } ), session.githubcallback)
        this.get('/current', ['PUBLIC'] , passportAuth('jwt'), session.currentSession)
    }
}

module.exports = SessionRouter
