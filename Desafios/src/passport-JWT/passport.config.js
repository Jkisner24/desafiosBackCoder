const passport = require('passport')
const jwt = require('passport-jwt')
const {JWT_SECRET_KEY} = require('../config/config')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => req?.cookies?.['coderCookieToken'] || null

//decrypt and go to the next level
const initPassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
    passport.use("urlJwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET_KEY
    }, async(jwt_payload,done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
 
}

module.exports = {
    initPassport
}
