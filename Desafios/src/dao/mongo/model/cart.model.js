const { Schema, model } = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        index: true
    },
    products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        qty: {
            type: Number
        }
    }
    ]
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}