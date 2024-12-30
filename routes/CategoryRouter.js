const router = require('express').Router()
const controller = require('../Controllers/CategoriesController')
const middleware = require('../middleware')

router.get('/', controller.GetCategories)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateCategory
)

router.put(
  '/:category_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateCategory
)

router.delete(
  '/:category_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCategory
)
module.exports = router
