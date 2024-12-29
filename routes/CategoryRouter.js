const router = require('express').Router()
const controller = require('../Controllers/CategoriesController')
const middleware = require('../middleware')
const verifyAdmin = require('../middleware/verifyAdmin')

// Public Routes
router.get('/', controller.GetCategories)
router.get('/:category_id', controller.GetCategoryWithServices)

// Admin Routes
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  verifyAdmin,
  controller.CreateCategory
)
router.put(
  '/:category_id',
  middleware.stripToken,
  middleware.verifyToken,
  verifyAdmin,
  controller.UpdateCategory
)
router.delete(
  '/:category_id',
  middleware.stripToken,
  middleware.verifyToken,
  verifyAdmin,
  controller.DeleteCategory
)

module.exports = router
