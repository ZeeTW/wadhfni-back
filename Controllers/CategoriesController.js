const { Category } = require('../models')

// 📝 Get All Categories
const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.status(200).send(categories)
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to fetch categories', error })
  }
}

// 📝 Create a New Category
const CreateCategory = async (req, res) => {
  try {
    const { name, description } = req.body

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res
        .status(400)
        .send({ msg: 'Category with this name already exists.' })
    }

    // Create the new category
    const category = await Category.create({ name, description })
    res.status(201).send({ msg: 'Category Created', category })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to create category', error })
  }
}

// 🛠️ Update a Category by ID
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
    res.status(500).send({ msg: 'Failed to update category', error })
  }
}

// 🗑️ Delete a Category by ID
const DeleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params
    const deletedCategory = await Category.findByIdAndDelete(category_id)

    if (!deletedCategory) {
      return res.status(404).send({ msg: 'Category not found' })
    }

    res
      .status(200)
      .send({ msg: 'Category Deleted', payload: category_id, status: 'Ok' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Failed to delete category', error })
  }
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
}
