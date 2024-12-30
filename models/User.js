const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordDigest: { type: String, required: true },
  role: { type: String, default: 'user' },
  location: { type: String },
  profileImg: { type: String }
})

module.exports = userSchema
