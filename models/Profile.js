const { Schema } = require('mongoose')

const profileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: { type: String },
  Socials: { type: String },
  Orders: { type: String }
})

module.exports = profileSchema
