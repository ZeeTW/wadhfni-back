const router = require('express').Router()
const controller = require('../Controllers/ServiceController')
const middleware = require('../middleware')

router.get('/', controller.GetServices)
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
