const passport = require('passport')

//function to validate the route
const passportAuth = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err)
            if(!user) return res.status(401).send({status:"error", error: info.message? info.message : info.toString()})
            req.user = user
            next()
        })(req, res, next)
    }
} 


const passportCallUrl = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if(err) return next(err)
            if(!user) return res.redirect("/api/views/session/restore")
            req.user = user
            next()
        })(req, res, next)
    }
}
  


module.exports = {
    passportAuth,
    passportCallUrl
}