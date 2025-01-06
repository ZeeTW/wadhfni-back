const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

//  Hash Password
const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

//  Compare Password
const comparePassword = async (password, storedPassword) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

//  Create Token
const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

//  Extract Token from Headers
const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]

    if (token) {
      res.locals.token = token
      return next()
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: Token Missing' })
  } catch (error) {
    console.error(error)
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals
  // Gets the token stored in the request lifecycle state
  try {
    let payload = jwt.verify(token, APP_SECRET)
    // Verifies the token is legit
    if (payload) {
      res.locals.payload = payload // Passes the decoded payload to the next function
      // Calls the next function if the token is valid
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
  }
}

// const validateImageUrl = (req, res, next) => {
//   const { profileImageUrl } = req.body

//   // Simple URL regex for validation
//   const urlPattern =
//     /^https?:\/\/(?:www\.)?[a-z0-9\-]+\.[a-z]{2,}(?:\/[^\s]*)?$/i
//   if (!profileImageUrl || !urlPattern.test(profileImageUrl)) {
//     return res.status(400).json({ message: 'Invalid image URL format' })
//   }

//   next()
// }

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
  // validateImageUrl
}
