const { Order } = require('../models')

const GetOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('buyer')
    res.status(200).send(orders)
  } catch (error) {
    throw error
  }
}
const GetUserOrders = async (req, res) => {
  try {
    const userId = req.user.id
    const orders = await Order.find({ user: userId }).populate('serviceId')
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
}

// const GetOrderById = async (req, res) => {
//   try {
//     const { order_id } = req.params
//     console.log('order_id', order_id)
//     const order = await Order.findById(order_id).populate('serviceId')

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' })
//     }

//     res.status(200).json(order)
//   } catch (error) {
//     console.error('Failed to fetch order:', error)
//     res.status(500).json({ message: 'Failed to fetch order' })
//   }
// }

const GetOrderById = async (req, res) => {
  try {
    const { order_id } = req.params
    console.log('order_id', order_id)
    console.log('req.params', req.params)
    const order = await Order.find({
      userId: '677646b34c20dc5095a1eafb'
    }).populate('serviceId')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    console.log('order:', order)

    res.status(200).json(order)
  } catch (error) {
    console.error('Failed to fetch order:', error)
    res.status(500).json({ message: 'Failed to fetch order' })
  }
}

const CreateOrder = async (req, res) => {
  try {
    const { serviceId, status, price, order_date, payment_status } = req.body

    if (!serviceId || !price) {
      return res.status(400).send('Service ID and price are required')
    }

    const userId = req.user.id

    const order = await Order.create({
      userId,
      serviceId,
      status: status || 'pending',
      price,
      order_date: order_date || new Date(),
      payment_status: payment_status || 'pending'
    })

    await order.populate('serviceId')
    await order.populate('userId')

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
  GetUserOrders,
  GetOrderById,
  CreateOrder,
  UpdateOrder,
  DeleteOrder
}
