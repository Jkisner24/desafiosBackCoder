const {connect} = require('mongoose')

module.exports = {
    connectDb: ()=>{
        connect('mongodb+srv://julikisner:X0BWaU02EHJdFIio@cluster0.jq6nt7n.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('Base de datos conectada')
    }
}


