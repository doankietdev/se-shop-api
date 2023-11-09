'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')

const productTypeSchema = Joi.object({
  name: Joi.string().required().max(20),
  description: Joi.string().required().max(100)
})

const validateCreateProductType = asyncHandling(async (req, res, next) => {
  const { name, description } = req.body

  try {
    await productTypeSchema.validateAsync({ name, description }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateUpdateProductTypeById = asyncHandling(async (req, res, next) => {
  const { name } = req.body

  try {
    await productTypeSchema.validateAsync({ name }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateDeleteProductTypeByIds = asyncHandling(async (req, res, next) => {
  const { ids } = req.body

  const idsSchema = Joi.object({
    ids: Joi.array().items(Joi.number())
  })

  try {
    await idsSchema.validateAsync({ ids }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateCreateProductType,
  validateUpdateProductTypeById,
  validateDeleteProductTypeByIds
}