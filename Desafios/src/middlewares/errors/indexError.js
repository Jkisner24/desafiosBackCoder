const productEnumError = require("../../services/errors/enumError")
const logger = require('../../config/logger')

const errorMiddleware = (err, req, res, next) => {
    let errors = Object.values(productEnumError)
    if (errors.includes(err.code)) {
        res.status(400).send({ err, message: err.message })
    } else {
        res.status(400).send({ name: err.name, message: err.message })
    }
    logger.fatal({ message: err.message })
}

module.exports = errorMiddleware