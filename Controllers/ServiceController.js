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
const GetUserServices = async (req, res) => {
  try {
    const userId = req.user.id
    const services = await Service.find({ user: userId })
    res.status(200).json(services)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch services' })
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
    const { serviceId } = req.params
    await Service.findByIdAndDelete(serviceId)
    res.status(200).json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete service' })
  }
}

module.exports = {
  GetServices,
  GetUserServices,
  GetServiceById,
  CreateService,
  UpdateService,
  DeleteService
}
