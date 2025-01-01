const router = require('express').Router()
const controller = require('../Controllers/ServiceController')
const middleware = require('../middleware')

// Get all services
router.get('/', controller.GetServices)

// Get a single service by its ID
router.get('/:service_id', controller.GetServiceById) // New route for fetching service by ID

// Create a new service (authentication required)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateService
)

// Update a service by its ID (authentication required)
router.put(
  '/:service_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateService
)

// Delete a service by its ID (authentication required)
router.delete(
  '/:service_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteService
)

module.exports = router
