const jsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentation with Swagger',
            description: 'You can test the routes here!',
            version: '1.0.0'
        },
        servers: [
            { url: "http://localhost:8080" }
        ]
    },
    apis: [`./src/docs/**/*.yaml`]
}

module.exports = jsdoc(swaggerOptions)