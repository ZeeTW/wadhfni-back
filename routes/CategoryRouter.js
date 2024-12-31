const router = require('express').Router()
const controller = require('../Controllers/CategoriesController')
const middleware = require('../middleware')

router.get('/', controller.GetCategories)

// Get all services by category
router.get('/services/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params
    const services = await Service.find({ categoryId })
    res.status(200).json(services)
  } catch (error) {
    console.error('Failed to fetch services by category:', error)
    res.status(500).json({ msg: 'Failed to fetch services', error })
  }
})

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
