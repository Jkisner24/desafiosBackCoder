const { Schema, model } = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")

const collection = "products"

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.String,
        ref: 'users',
        default: 'ADMIN'
    },

});

productSchema.plugin(mongoosePaginate);
const productModel = model(collection, productSchema);

module.exports = {
    productModel
}
