const passport = require('passport')
const jwt = require('passport-jwt')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

//extract the cookie from the request
const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken']
    }
    return token
}
//decrypt and go to the next level
const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "PalabraJWTSecreta"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    //strategy current
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "PalabraJWTSecreta"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}


module.exports = {
    initializePassport
}