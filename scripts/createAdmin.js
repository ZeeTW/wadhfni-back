// scripts/seedAdmin.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { User } = require('../models') // Adjust path based on your structure

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wadhfni',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('✅ Connected to MongoDB')

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:', existingAdmin.email)
      return
    }

    // Create a new admin user with the updated User Schema fields
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordDigest: hashedPassword,
      role: 'admin',
      location: 'Admin Location', // You can update with actual location
      profileImg: 'default-admin-image.jpg' // Update with actual image if available
    })

    console.log('✅ Admin user created:', adminUser.email)
  } catch (error) {
    console.error('❌ Error seeding admin user:', error)
  } finally {
    mongoose.connection.close()
    console.log('🔌 MongoDB connection closed')
  }
}

// Run the script
seedAdmin()
