const express = require('express')
const {
  getProfile,
  updateProfileImage,
  updateProfile
} = require('../Controllers/ProfileController')
const { verifyToken, validateImageUrl } = require('../middleware')
const router = express.Router()

// Get current user's profile data
router.get('/', verifyToken, getProfile)

router.put('/', verifyToken, updateProfile)

// Update profile image URL
router.post(
  '/upload',
  verifyToken,
  validateImageUrl,
  updateProfileImage
)

module.exports = router
