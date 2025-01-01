const router = require('express').Router()
const controller = require('../Controllers/OrderController')
const middleware = require('../middleware')

router.get('/', controller.GetOrders)
router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.CreateOrder
)

router.put(
  '/:order_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateOrder
)

router.delete(
  '/:order_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteOrder
)
module.exports = router
