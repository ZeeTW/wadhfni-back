const { Category, Service, User } = require('../models')

// Create a New Category (Admin Only)
const CreateCategory = async (req, res) => {
  try {
    // Check if req.user exists and has an admin role
    if (req.user.role !== 'admin') {
      return res.status(403).send({ msg: 'Only admins can create categories' })
    } else {
      const { name, description } = req.body

      // Check if the category already exists
      const existingCategory = await Category.findOne({ name })
      if (existingCategory) {
        return res
          .status(400)
          .send({ msg: 'Category with this name already exists.' })
      } else {
        // Create the new category
        const category = await Category.create({ name, description })
        return res.status(201).send({ msg: 'Category Created', category })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ msg: 'Failed to create category', error })
  }
}

// Update a Category (Admin Only)
const UpdateCategory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send({ msg: 'Only admins can update categories' })
    } else {
      const { category_id } = req.params
      const updatedCategory = await Category.findByIdAndUpdate(
        category_id,
        req.body,
        { new: true }
      )
      if (!updatedCategory) {
        return res.status(404).send({ msg: 'Category not found' })
      } else {
        return res
          .status(200)
          .send({ msg: 'Category Updated', updatedCategory })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ msg: 'Failed to update category', error })
  }
}

// Delete a Category (Admin Only)
const DeleteCategory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send({ msg: 'Only admins can delete categories' })
    } else {
      const { category_id } = req.params
      const deletedCategory = await Category.findByIdAndDelete(category_id)
      if (!deletedCategory) {
        return res.status(404).send({ msg: 'Category not found' })
      } else {
        return res.status(200).send({ msg: 'Category Deleted' })
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ msg: 'Failed to delete category', error })
  }
}

// Get All Categories
const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    return res.status(200).send(categories)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ msg: 'Failed to fetch categories', error })
  }
}

// Get a Category by ID with Services
const GetCategoryWithServices = async (req, res) => {
  try {
    const { category_id } = req.params
    const category = await Category.findById(category_id)
    if (!category) {
      return res.status(404).send({ msg: 'Category not found' })
    } else {
      const services = await Service.find({ categoryId: category_id })
      return res.status(200).send({ category, services })
    }
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .send({ msg: 'Failed to fetch category with services', error })
  }
}

module.exports = {
  CreateCategory,
  GetCategories,
  GetCategoryWithServices,
  UpdateCategory,
  DeleteCategory
}
