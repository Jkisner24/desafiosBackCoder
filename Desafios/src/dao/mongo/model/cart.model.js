const { Schema, model } = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    user: {
        type: Schema.ObjectId
    },
    products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
        },
        quantity: {
            type: Number
        }
    }
    ]
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}