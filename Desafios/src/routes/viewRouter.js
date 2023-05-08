const {Router} = require('express')
const {viewProductLive, viewProductStatic} = require('../handlers/viewHandlers')

const viewRouter = Router()

viewRouter.get('/home', viewProductStatic)
// viewRouter.get('/realtimeprod', viewProductLive)


module.exports = viewRouter;