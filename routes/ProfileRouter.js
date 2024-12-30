const express = require('express')
const {
  getProfile,
  uploadProfileImage
} = require('../Controllers/ProfileController')
const { authenticate } = require('../middleware')
const multer = require('multer')
const router = express.Router()

// Configure multer to handle single file uploads
const upload = multer()

// Get current user's profile data
router.get('/profile', authenticate, getProfile)

// Upload a new profile image
router.post(
  '/profile/upload',
  authenticate,
  upload.single('profileImage'),
  uploadProfileImage
)

module.exports = router
