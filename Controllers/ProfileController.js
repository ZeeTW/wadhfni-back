const { User, Profile } = require('../models')

// Fetch user profile
const getProfile = async (req, res) => {
  console.log(req.user)
  try {
    const userId = req.user.id
    const user = await User.findById(userId) // Find user by ID (userId comes from the token)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Send the user profile data
    const profileData = {
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role
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

    // Fetch or create the user's profile
    let profile = await Profile.findOne({ user: userId })
    if (!profile) {
      // If no profile exists, create one
      profile = new Profile({ user: userId })
    }

    // Update the profile image URL
    profile.profileImage = profileImageUrl
    await profile.save()

    // Update the reference in the User model as well (if needed)
    user.profileImg = profileImageUrl
    await user.save()

    return res.status(200).json({
      message: 'Profile image updated successfully',
      profileImageUrl: profile.profileImage
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, email, location, role } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (name) user.name = name
    if (email) user.email = email
    if (location) user.location = location
    if (role) user.role = role

    await user.save()

    return res
      .status(200)
      .json({ message: 'Profile updated successfully', user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id
    console.log('User ID:', req.params.id)
    console.log('Request body:', req.body)
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true
    })
    res.status(200).send(user)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(400).send({ msg: 'error updating', error })
  }
}

module.exports = {
  getProfile,
  updateProfileImage,
  updateProfile,
  updateUser
}
