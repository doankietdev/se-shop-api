'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const genderService = require('~/api/v1/services/gender.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createGender = asyncHandling(async (req, res) => {
  const { name } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await genderService.createGender({ name })
  }).send(res)
})

const getAllGenders = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    metadata: await genderService.getAllGenders({ filter, selector, pagination, sorter })
  }).send(res)
})

const getGenderById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await genderService.getGenderById({ id })
  }).send(res)
})

const updateGenderById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  new SuccessResponse({
    metadata: await genderService.updateGenderById({ id, name })
  }).send(res)
})

const deleteGenderById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await genderService.deleteGenderById({ id })
  }).send(res)
})

const deleteGenderByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await genderService.deleteGenderByIds({ ids })
  }).send(res)
})

module.exports = {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
}