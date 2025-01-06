const express = require('express')
const {
  getProfile,
  updateProfileImage,
  updateProfile,
  updateUser
} = require('../Controllers/ProfileController')
const { verifyToken, validateImageUrl } = require('../middleware')
const router = express.Router()

// Get current user's profile data
router.get('/', verifyToken, getProfile)

router.put('/', verifyToken, updateUser)

// Update profilei mage URL
router.post('/upload', verifyToken, updateProfileImage)

module.exports = router
