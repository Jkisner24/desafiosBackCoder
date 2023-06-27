const passport = require('passport')

//function to validate the route
 const passportAuth = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err)
            const { user: currentUser } = user 
            if (!user) return res.status(401).send({ status: 'error', error: info.message ? info.message : info.toString() })
            console
            //if it passed these two barriers it´s ok and it passes
            req.user = currentUser
            next()
        })(req, res, next)
    }
} 



module.exports = {
    passportAuth
}