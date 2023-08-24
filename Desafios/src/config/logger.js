const winston = require('winston')
const {commander} = require('../process/commander')
const {mode} = commander.opts()
let logger 

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "yellow",
        warning: "black yellowBG",
        info: "blue",
        http: "green",
        debug: "magenta",
    }
}

switch(mode) {
    case "development": 
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: process.env.LEVEL_LOGGER,
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple(),
                    winston.format.printf(info => `[${info.level}] ${info.message}`)
                    )
                })
        ]
    })
    break;
    case "production": 
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: process.env.LEVEL_LOGGER,
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: "./errors.log",
                level: process.env.LEVEL_LOGGER,
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                ),
            })
        ]
    })
    break;
}

module.exports = logger
