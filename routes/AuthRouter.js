const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

router.post('/login', controller.SignIn)
router.post('/register', controller.SignUp)
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

module.exports = router
