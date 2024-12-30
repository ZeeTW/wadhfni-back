const mongoose = require('mongoose')
const userSchema = require('./User')
const serviceSchema = require('./Service')
const categorySchema = require('./Category')
const orderSchema = require('./Order')
const reviewSchema = require('./Review')

const User = mongoose.model('User', userSchema)
const Service = mongoose.model('Service', serviceSchema)
const Order = mongoose.model('Order', orderSchema)
const Review = mongoose.model('Review', reviewSchema)
const Category = mongoose.model('Category', categorySchema)


module.exports = {
  User,
  Service,
  Category,
  Order,
  Review
}
