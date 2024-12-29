const { Review } = require('../models')

const GetReviews = async (req,res) => {
  try {
    const reviews = await Review.find({}).populate('user')
    res.status(200).send(reviews)
  } catch (error) {
    throw(error)
  }
}

const CreateReview = async (req,res) => {
  try {
    const review = await Review.create({...req.body})
    res.status(200).send(review)
  } catch (error) {
    throw(error)
  }
}

const UpdateReview = async (req,res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.review_id, req.body, {
      new:true
    })
    res.status(200).send(review)
  } catch (error) {
    throw error
  }
}

const DeleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.review_id })
    res
      .status(200)
      .send({ msg: 'Review Deleted', payload: req.params.review_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetReviews,
  CreateReview,
  UpdateReview,
  DeleteReview
}