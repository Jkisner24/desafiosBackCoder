const dotenv = require('dotenv')
const {commander} = require('../process/commander.js')
const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.development.env' : './.production.env'
})


module.exports = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PORT: process.env.PORT,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
}