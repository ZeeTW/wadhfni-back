const { Category, Service } = require('../models')

// 🛡️ Middleware Placeholder (Ensure Admin Role)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }
  return res.status(403).send({ msg: 'Access Denied: Admins Only' })
}

// 🆕 Create a New Category (Admin Only)
const CreateCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const category = await Category.create({ name, description })
    res.status(201).send({ msg: 'Category Created', category })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to create category' })
  }
}

// 📚 Get All Categories
const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.status(200).send(categories)
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to fetch categories' })
  }
}

// 🔍 Get a Category by ID with Services
const GetCategoryWithServices = async (req, res) => {
  try {
    const { category_id } = req.params
    const category = await Category.findById(category_id)
    if (!category) {
      return res.status(404).send({ msg: 'Category not found' })
    }
    const services = await Service.find({ categoryId: category_id })
    res.status(200).send({ category, services })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to fetch category with services' })
  }
}

// ✏️ Update a Category (Admin Only)
const UpdateCategory = async (req, res) => {
  try {
    const { category_id } = req.params
    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      req.body,
      { new: true }
    )
    if (!updatedCategory) {
      return res.status(404).send({ msg: 'Category not found' })
    }
    res.status(200).send({ msg: 'Category Updated', updatedCategory })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to update category' })
  }
}

// 🗑️ Delete a Category (Admin Only)
const DeleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params
    const deletedCategory = await Category.findByIdAndDelete(category_id)
    if (!deletedCategory) {
      return res.status(404).send({ msg: 'Category not found' })
    }
    res.status(200).send({ msg: 'Category Deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to delete category' })
  }
}

module.exports = {
  CreateCategory,
  GetCategories,
  GetCategoryWithServices,
  UpdateCategory,
  DeleteCategory
}
