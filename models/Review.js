const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: {type: Number},
    comment: {type: String},
    created_at: {type:Date}

  }
)

module.exports = reviewSchema