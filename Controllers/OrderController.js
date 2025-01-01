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
    const { serviceId } = req.body
    const newOrder = new Order({
      serviceId,
      status: 'pending', // You can default status here
      price: 0, // Or some default value or calculate based on service
      order_date: new Date(),
      payment_status: 'pending'
    })

    await newOrder.save()
    res.status(200).send(newOrder)
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to create order' })
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
    res.status(200).send({
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
