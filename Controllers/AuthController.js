const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, name, location, role  } = req.body
    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      // Creates a new user
      const user = await User.create({ name, email, passwordDigest, location, role })
      // Sends the user as a response
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { name, password } = req.body

    const user = await User.findOne({ name })

    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )

    if (matched) {
      let payload = {
        id: user.id,
        email: user.name
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
    const { oldPassword, newPassword } = req.body

    let user = await User.findById(req.params.user_id)

    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res
        .status(200)
        .send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  // logout,
  CheckSession
}
