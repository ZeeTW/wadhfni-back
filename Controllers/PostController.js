const { Post } = require('../models/User')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).send(posts)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body })
    res.status(200).send(post)
  } catch (error) {
    throw error
  }
}

const UpdatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.post_id, req.body, {
      new: true
    })
    res.status(200).send(post)
  } catch (error) {
    throw error
  }
}

const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id })
    res
      .status(200)
      .send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost
}