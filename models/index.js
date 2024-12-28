const mongoose = require('mongoose')
const userSchema = require('./User')
const serviceSchema = require('./Service')

const User = mongoose.model('User', userSchema)
const Service = mongoose.model('Service', serviceSchema)

module.exports = {
  User,
  Service
}
