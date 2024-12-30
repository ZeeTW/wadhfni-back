const { User, Profile } = require('../models')

// Get the current user's profile information
const getProfile = async (req, res) => {
  try {
    // Assuming the user is logged in and their ID is in req.user (from middleware)
    const userId = req.user.id

    // Fetch the user and their profile data
    const user = await User.findById(userId).populate('profile') // Assuming 'profile' is referenced in User model

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the user's profile data (username, email, and profile image)
    const profileData = {
      username: user.name,
      email: user.email,
      profileImage: user.profile ? user.profile.profileImageUrl : null
    }

    return res.status(200).json(profileData)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Handle updating the profile image URL
const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id
    const { profileImageUrl } = req.body // The image URL passed from the frontend

    // Fetch the user from the database
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if the user has an existing profile
    let profile = await Profile.findOne({ user: userId })
    if (!profile) {
      // If no profile exists, create one
      profile = new Profile({ user: userId })
    }

    // Update the profile image URL
    profile.profileImageUrl = profileImageUrl
    await profile.save()

    return res.status(200).json({
      message: 'Profile image updated successfully',
      profileImageUrl: profile.profileImageUrl
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getProfile,
  updateProfileImage
}
