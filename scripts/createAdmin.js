const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { User } = require('../models')
const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Connected to MongoDB')

    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:', existingAdmin.email)
      return
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordDigest: hashedPassword,
      role: 'admin'
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

//so proud this actually works heheheheh...mwahahahahahh
