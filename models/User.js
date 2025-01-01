const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordDigest: { type: String, required: true },
  role: {
    type: String,
    default: 'user',
    enum: ['freelancer', 'employer'],
    required: true
  },
  location: { type: String },
  // profileImg: { type: String },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
})

module.exports = userSchema
