const {Schema} = require('mongoose')

const userSchema = new Schema(
  {
    username:{type: String, required: true},
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    role: { type: String},
    location:{type: String, required: true},
    profileImg: {type: String}
  }
)

module.exports = userSchema