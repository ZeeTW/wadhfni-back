const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/AuthRouter')
const ServiceRouter = require('./routes/ServiceRouter')
const CategoryRouter = require('./routes/CategoryRouter')
const OrderRouter = require('./routes/OrderRouter')
const ReviewRouter = require('./routes/ReviewRouter')
const ProfileRouter = require('./routes/ProfileRouter')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

// Middleware setup
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route setup
app.use('/auth', AuthRouter)
app.use('/services', ServiceRouter)
app.use('/categories', CategoryRouter)
app.use('/orders', OrderRouter)
app.use('/reviews', ReviewRouter)
app.use('/profile', ProfileRouter)

// Default route
app.use('/', (req, res) => {
  res.send('Connected!')
})

app.get('/api/services/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  try {
    const services = await Service.find({ categoryId })
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
