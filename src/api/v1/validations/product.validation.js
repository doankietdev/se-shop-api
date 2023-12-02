'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const cloudinaryProvider = require('~/api/v1/providers/cloudinary.provider')

const productSchema = Joi.object({
  name: Joi.string().max(200).required(),
  description: Joi.string().max(1000),
  image: Joi.string().required(),
  screen: Joi.string().max(200),
  operatingSystem: Joi.string().max(50),
  processor: Joi.string().max(50),
  ram: Joi.number().min(1),
  storageCapacity: Joi.number().min(1),
  dimensions: Joi.string().max(50),
  weight: Joi.number().min(1),
  batteryCapacity: Joi.number().min(1),
  frontCameraResolution: Joi.string().max(50),
  rearCameraResolution: Joi.string().max(50),
  connectivity: Joi.string().max(200),
  color: Joi.string().max(50),
  price: Joi.number().min(1).required(),
  stockQuantity: Joi.number().min(0).required(),
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