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
    },
    password: {
        type: String
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user'
    },
    date_of_birth: {
        type: Date,
        required: true,
    }
})

usersSchema.virtual('age').get(function() {
    const currentDate = new Date();
    const birthDate = this.date_of_birth;
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    return ageInYears;
});

// Configurar opción para incluir las propiedades virtuales al convertir a objeto JSON
usersSchema.set('toJSON', { virtuals: true });


const userModel = model(collection, usersSchema)

module.exports = {
    userModel
}