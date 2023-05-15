const {Schema, model} = require ('mongoose')
const collection = 'users'

const usersSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        index: true
    },
    last_name:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userModel = model(collection, usersSchema)

module.exports = {
    userModel
}