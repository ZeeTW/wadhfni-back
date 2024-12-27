const { User } = require('../models/User')
const middleware = require('../middleware/index')

const SignUp = async (req, res) => {
  try {
    const { email, username, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const user = await User.create({ username, email, passwordDigest })
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }

      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { password } = req.body
    const { user_id } = req.params
    const passwordDigest = await middleware.hashPassword(password)
    await User.findByIdAndUpdate(user_id, { passwordDigest })
    res.status(200).send({ status: 'Success', msg: 'Password updated' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: 'Error', msg: 'Password update failed' })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  SignUp,
  SignIn,
  UpdatePassword,
  CheckSession
}
