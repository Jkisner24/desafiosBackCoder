const passport         = require("passport")
const GitHubStrategy   = require("passport-github2")
const { userService } = require("../services")
require("dotenv").config()

const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getById({email: profile._json.email})
            console.log('Profile', profile)
            if(!user){
                let result = await userService.addUser({
                    first_name: profile.username, 
                    last_name: profile.username,
                    email: profile._json.email,
                    date_of_birth: profile._json.created_at,
                    password: " ",
                })
                //console.log(result);
                return done(null, result)
            }
            
            return done(null, user)
        } catch (error) {
            console.log(error);
        }
    }))

    passport.serializeUser((user, done) => {
        const serializedUser = JSON.stringify(user);
        done(null, serializedUser);
    })
    passport.deserializeUser((async (id, done) => {
        let user = await userService.getById({_id: id})
        done(null,user)
    }))
}

module.exports = {
    initPassportGithub
}