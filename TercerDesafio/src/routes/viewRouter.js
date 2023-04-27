const {Router} = require('express')
const {viewProductStatic, viewProductLive} = require('../handlers/viewHandlers')

const viewRouter = Router()

viewRouter.get('/home', viewProductStatic)
viewRouter.get('/realtimeprod', viewProductLive)


module.exports = viewRouter;