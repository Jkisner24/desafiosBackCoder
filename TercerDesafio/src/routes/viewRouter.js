const {Router} = require('express')
const {getViews} = require('../handlers/viewHandlers')

const viewRouter = Router()

viewRouter.get('/vista', getViews)

module.exports = viewRouter