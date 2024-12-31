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

router.get('/services/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId

    // Convert categoryId to ObjectId to match the type in MongoDB
    const categoryObjectId = mongoose.Types.ObjectId(categoryId)

    // Fetch services matching the categoryId
    const services = await Service.find({ categoryId: categoryObjectId })

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: 'No services found for this category' })
    }

    res.json(services) // Return the services in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error })
  }
})

module.exports = router
