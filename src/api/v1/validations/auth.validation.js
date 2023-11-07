'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')

const validateSignUp = asyncHandling(async (req, res, next) => {
  const {
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password
  } = req.body

  const userSchema = Joi.object({
    genderId: Joi.number(),
    lastName: Joi.string().required().max(30),
    firstName: Joi.string().required().max(20),
    phoneNumber: Joi.string().required().min(10).max(11),
    email: Joi.string().max(50),
    address: Joi.string().max(100),
    username: Joi.string().required().min(6).max(40),
    password: Joi.string().required().min(6).max(40)
  })

  try {
    await userSchema.validateAsync({
      genderId, lastName, firstName, phoneNumber,
      email, address, username, password
    }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateSignUp
}