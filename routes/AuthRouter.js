const router = require('express').Router()
const controller = require('../Controllers/AuthController')
const middleware = require('../middleware')
const verifyAdmin = require('../middleware/verifyAdmin')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

router.put(
  '/make-admin/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  verifyAdmin, // Only an existing admin can promote another user
  controller.MakeAdmin
)

module.exports = router
