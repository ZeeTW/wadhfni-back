const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/AuthRouter')
const ServiceRouter = require('./routes/ServiceRouter')
const CategoryRouter = require('./routes/CategoryRouter')

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

// Default route
app.use('/', (req, res) => {
  res.send('Connected!')
})

// Start server
app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
