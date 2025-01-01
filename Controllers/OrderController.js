const { Order } = require('../models')

const GetOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('buyer')
    res.status(200).send(orders)
  } catch (error) {
    throw error
  }
}

const CreateOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body })
    res.status(200).send(order)
  } catch (error) {
    throw error
  }
}

const UpdateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.order_id, req.body, {
      new: true
    })
    res.status(200).send(order)
  } catch (error) {
    throw error
  }
}

const DeleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.order_id })
    res
      .status(200)
      .send({
        msg: 'Order Deleted',
        payload: req.params.order_id,
        status: 'Ok'
      })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetOrders,
  CreateOrder,
  UpdateOrder,
  DeleteOrder
}
