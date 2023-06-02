const passport = require('passport')
const local = require('passport-local')
const GithubStrategy = require('passport-github2')
const userManager = require('../dao/mongo/user.mongo')
const { createHash } = require('../utils/bcryptHash')
require('dotenv').config()



const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name } = req.body
            const newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            const addUser = await userManager.addUser(newUser)
            return done(null, addUser)
        } catch (error) {
            return done(null, false)
        }
    }))

    passport.serializeUser((user, done) => {
        try {
            done(null, user._id)
        } catch (error) {
            if (error) return done(error)
        }
    })
    passport.deserializeUser(async (uid, done) => {
        let user = await userManager.getUserById(uid)
        done(null, user)
    })

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const userData = {
                email: username,
                password
            }
            const user = await userManager.loginUser(userData)
            done(null, user)
        } catch (error) {
            return done(null, false)
        }
    }))
}

const initPassortGithub = ()=>{
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('Profile', profile)
        try {
            const userGitHub = await userManager.addUserGithub(profile._json)
            return done(null, userGitHub)

        } catch (error) {
            if (error) return done(null, false)
        }
    }))

    passport.serializeUser((user, done) => {
        try {
            if (user.email === 'adminCoder@coder.com') {
                return user.role = 'admin'
            }
            user.role = 'user'
            done(null, user)
        } catch (error) {
            if (error) return done(error)
        }
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })

}

module.exports = {
    initPassport,
    initPassortGithub
}

