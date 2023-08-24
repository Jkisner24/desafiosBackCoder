const MongoSingleton = require('../utils/singleton')

module.exports = {
    connectDb: async () => await MongoSingleton.getInstance()
}