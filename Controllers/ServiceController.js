const { Service } = require('../models')

const GetServices = async (req, res) => {
  try {
    const services = await Service.find({
      categoryId: req.query.categoryId
    }).populate('categoryId')
    res.status(200).send(services)
  } catch (error) {
    throw error
  }
}

const GetServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.service_id).populate(
      'categoryId'
    )
    if (!service) {
      return res.status(404).send({ message: 'Service not found' })
    }
    res.status(200).send(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    res.status(500).send({ message: 'Error fetching service' })
  }
}

const CreateService = async (req, res) => {
  try {
    const service = await Service.create({ ...req.body })
    res.status(200).send(service)
  } catch (error) {
    throw error
  }
}

const UpdateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.service_id,
      req.body,
      {
        new: true
      }
    )
    res.status(200).send(service)
  } catch (error) {
    throw error
  }
}

const DeleteService = async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.service_id })
    res.status(200).send({
      msg: 'Service Deleted',
      payload: req.params.service_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetServices,
  GetServiceById,
  CreateService,
  UpdateService,
  DeleteService
}
