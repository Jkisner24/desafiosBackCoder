const { Schema, model } = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
   // user: {
   //     type: Schema.Types.ObjectId,
   //     ref: 'users',
    //    index: true
    //},
    status: String,
    products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: {
            type: Number
        }
    }
    ]
})

cartSchema.pre('findOne', function(){
	this.populate('products.idProduct')
}) 

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}