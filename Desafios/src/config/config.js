const dotenv = require('dotenv')
const {commander} = require('../process/commander.js')
const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.development.env' : './.production.env'
})


module.exports = {
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PERSISTENCE,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    GMAIL_EMAIL_ADMIN: process.env.GMAIL_EMAIL_ADMIN
}