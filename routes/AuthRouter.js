const router = require('express').Router()
const controller = require('../Controllers/AuthController')
const middleware = require('../middleware')

router.post('/signin', controller.SignIn)
router.post('/signup', controller.SignUp)
router.put('/update/:user_id', middleware.stripToken, middleware.verifyToken)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
