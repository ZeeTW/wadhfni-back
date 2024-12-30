const mongoose = require('mongoose')
const userSchema = require('./User')
const serviceSchema = require('./Service')
const categorySchema = require('./Category')

const User = mongoose.model('User', userSchema)
const Service = mongoose.model('Service', serviceSchema)
const Category = mongoose.model('Category', categorySchema)

module.exports = {
  User,
  Service,
  Category
}
