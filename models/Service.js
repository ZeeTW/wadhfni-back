const {Schema} = require('mongoose')

const serviceSchema = new Schema(
  {
    owner: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
    title: { type: String, required: true },
    description: {type: String},
    price: {type: Number},
    duration: {type: String},
    status: {type: String},
    categoryId:{type:mongoose.Schema.Types.ObjectId,
    ref: 'Category'
    }
  }
)

module.exports = serviceSchema