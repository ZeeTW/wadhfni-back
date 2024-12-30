const multer = require('multer')
const path = require('path')
const { User, Profile } = require('../models')
const middleware = require('../middleware')

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pics/') // The folder to store the images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Please upload an image file'), false)
  }
}

const upload = multer({ storage, fileFilter })

// Get the current user's profile information
const getProfile = async (req, res) => {
  try {
    // Assuming the user is logged in and their ID is in req.user (from middleware)
    const userId = req.user.id

    // Fetch the user and their profile data
    const user = await User.findById(userId).populate('profile')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the user's profile data (username, email, and profile image)
    const profileData = {
      username: user.name,
      email: user.email,
      profileImage: user.profile ? user.profile.profileImage : null // Add profileImage
    }

    return res.status(200).json(profileData)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Handle profile image upload
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Get userId from the session or token
    const userId = req.user.id

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Find or create the user's profile
    let profile = await Profile.findOne({ user: userId })
    if (!profile) {
      profile = new Profile({ user: userId })
    }

    // Update the profile with the new profile image URL
    profile.profileImage = `/uploads/profile_pics/${req.file.filename}`
    await profile.save()

    return res.status(200).json({
      message: 'Profile image uploaded successfully',
      profileImage: profile.profileImage
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Export the controller functions
module.exports = {
  getProfile,
  uploadProfileImage
}
