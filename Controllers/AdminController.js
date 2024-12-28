const { User } = require('../models')

// Grant Admin Role to a User
const Admin = async (req, res) => {
  try {
    const { user_id } = req.params
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { role: 'admin' },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).send({ msg: 'User not found' })
    }
    res.status(200).send({ msg: 'User promoted to admin', updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to make user admin' })
  }
}

module.exports = { Admin }
