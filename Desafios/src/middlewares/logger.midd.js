const logger = require("../config/logger")

const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`A request ${req.method} was made to the route ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = addLogger