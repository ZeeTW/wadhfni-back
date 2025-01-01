const { Order } = require('../models')

const GetOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('buyer')
    res.status(200).send(orders)
  } catch (error) {
    throw error
  }
}

const GetOrderById = async (req, res) => {
  try {
    const { order_id } = req.params
    const order = await Order.findById(order_id).populate('serviceId')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const orderWithServiceTitle = {
      ...order._doc,
      title: order.serviceId?.title || 'N/A'
    }

    res.status(200).json(orderWithServiceTitle)
  } catch (error) {
    console.error('Failed to fetch order:', error)
    res.status(500).json({ message: 'Failed to fetch order' })
  }
}

const CreateOrder = async (req, res) => {
  try {
    const { serviceId, status, price, order_date, payment_status } = req.body

    // Validate required fields
    if (!serviceId || !price) {
      return res.status(400).send('Service ID and price are required')
    }

    // Create the order
    const order = await Order.create({
      serviceId,
      status: status || 'pending',
      price,
      order_date: order_date || new Date(),
      payment_status: payment_status || 'pending'
    })

    // Populate service details for confirmation
    await order.populate('serviceId')

    res.status(201).json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).send('Failed to create order')
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
  GetOrderById,
  CreateOrder,
  UpdateOrder,
  DeleteOrder
}
