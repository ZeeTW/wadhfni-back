const router = require('express').Router()
const controller = require('../Controllers/ReviewController')
const middleware = require('../middleware')

router.get('/', controller.GetReviews)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateReview
)

router.put(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateReview
)

router.delete(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
)
module.exports = router
