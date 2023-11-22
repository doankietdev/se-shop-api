'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const cloudinaryProvider = require('~/api/v1/providers/cloudinary.provider')

const productSchema = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().max(100),
  image: Joi.string().required().max(200),
  displayDetails: Joi.string().max(255),
  operatingSystem: Joi.string().max(50),
  processor: Joi.string().max(50),
  ram: Joi.number().min(1),
  storage: Joi.number().min(1),
  dimensions: Joi.string().max(50),
  weight: Joi.number().min(1),
  batteryCapacity: Joi.number().min(1),
  frontCameraResolution: Joi.string().max(50),
  rearCameraResolution: Joi.string().max(50),
  connectivity: Joi.string().max(255),
  color: Joi.string().max(50),
  price: Joi.number().min(1),
  stockQuantity: Joi.number().min(0),
  categoryId: Joi.number().required()
})

const validateCreateProduct = asyncHandling(async (req, res, next) => {
  const file = req?.file

  try {
    await productSchema.validateAsync({ ...req.body, image: file?.path }, { abortEarly: false })
    next()
  } catch (error) {
    await cloudinaryProvider.destroyFile(file?.path)
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateCreateProduct
}