const mongoose = require('mongoose')
const { Schema } = mongoose

const serviceSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  duration: { type: String },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

module.exports = serviceSchema
