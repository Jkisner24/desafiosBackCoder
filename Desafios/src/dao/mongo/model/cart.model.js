const { Schema, model } = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    status: {
        type: String
    },
    products: [{
        id: Schema.ObjectId,
        quantity: Number
    }]

})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}