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

//  Verify Token
const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    let payload = jwt.verify(token, APP_SECRET)

    if (payload) {
      res.locals.payload = payload
      return next()
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: Invalid Token' })
  } catch (error) {
    console.error(error)
    res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
  }
}

//  Verify Admin Role
const verifyAdmin = (req, res, next) => {
  const { payload } = res.locals

  if (payload && payload.role === 'admin') {
    return next()
  }
  return res.status(403).send({ msg: 'Access Denied: Admins Only' })
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
  // verifyAdmin
}
