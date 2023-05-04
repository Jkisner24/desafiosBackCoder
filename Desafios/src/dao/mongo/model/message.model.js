const {Schema, model} = require('mongoose')

const collection = 'messages'

const messageSchema = new Schema({

    user: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
})

const messageModel = model(collection, messageSchema)

module.exports = {
    messageModel
};