const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  status:{type: String},
  price: {type:Number},
  order_date: {type:Date},
  delivery_date: {type:Date},
  payment_status: {type:String}
})

module.exports = orderSchema