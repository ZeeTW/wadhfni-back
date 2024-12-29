const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
) // This will automatically add createdAt and updatedAt fields

module.exports = categorySchema
