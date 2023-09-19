const nodemailer = require("nodemailer")
const config = require('../config/config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: config.GMAIL_EMAIL_ADMIN,
        pass: config.GMAIL_APP_PASSWORD
    }
})

module.exports = transport