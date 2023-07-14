const nodemailer = require('nodemailer')
const configServer = require('../config/configServer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: configServer.gmail_user_app,
        pass: configServer.gmail_pass_app
    }
})

exports.sendMail = async (body)=>{
    return await transport.sendMail({
        from: 'COMPRA REALIZADA<julikisner@gmail.com>',
        to: 'julikisner@gmail.com', //${body.purchaser}
        subject:'Thank you for making the purchase',
        html:`<div>
        <h1>Your purchase has been completed successfully</h1>
        <p>Codigo: ${body.code} </p>
        <p>Total: ${body.amount}$ </p>
        </div>`
    })
}