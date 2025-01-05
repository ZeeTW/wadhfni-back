const router = require('express').Router()
const controller = require('../Controllers/ServiceController')
const middleware = require('../middleware')

router.get('/', controller.GetServices)

router.get('/user', middleware.verifyToken, controller.GetUserServices)

router.get('/:service_id', controller.GetServiceById) // New route for fetching service by ID

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateService
)

router.put(
  '/:service_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateService
)

router.delete(
  '/:service_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteService
)

module.exports = router
