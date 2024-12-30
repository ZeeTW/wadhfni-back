const express = require('express')
const {
  getProfile,
  updateProfileImage
} = require('../Controllers/ProfileController')
const { verifyToken, validateImageUrl } = require('../middleware/auth')
const router = express.Router()

// Get current user's profile data
router.get('/profile', verifyToken, getProfile)

// Update profile image URL
router.post(
  '/profile/upload',
  verifyToken,
  validateImageUrl,
  updateProfileImage
)

module.exports = router
