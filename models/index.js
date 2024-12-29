const mongoose = require('mongoose')
const userSchema = require('./User')
const serviceSchema = require('./Service')
const orderSchema = require('./Order')

const User = mongoose.model('User', userSchema)
const Service = mongoose.model('Service', serviceSchema)
const Order = mongoose.model('Order', orderSchema)

module.exports = {
  User,
  Service,
  Order
}
