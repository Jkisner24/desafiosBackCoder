const {Router} = require('express')
const {viewProductLive, viewProductStatic} = require('../handlers/viewHandlers')

const viewRouter = Router()

viewRouter.get('/realtimeprod', viewProductLive)
viewRouter.get('/home', viewProductStatic)


module.exports = viewRouter