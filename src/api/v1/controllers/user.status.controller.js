'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const userStatusService = require('~/api/v1/services/user.status.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createUserStatus = asyncHandling(async (req, res) => {
  const { name } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await userStatusService.createUserStatus({ name })
  }).send(res)
})

const getAllUserStatuses = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    metadata: await userStatusService.getAllUserStatuses({ filter, selector, pagination, sorter })
  }).send(res)
})

const getUserStatusById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await userStatusService.getUserStatusById({ id })
  }).send(res)
})

const updateUserStatusById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  new SuccessResponse({
    metadata: await userStatusService.updateUserStatusById({ id, name })
  }).send(res)
})

const deleteUserStatusById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    statusCode: StatusCodes.NO_CONTENT,
    message: StatusCodes.NO_CONTENT,
    metadata: await userStatusService.deleteUserStatusById({ id })
  }).send(res)
})

const deleteGenderByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await userStatusService.deleteUserStatusByIds({ ids })
  }).send(res)
})

module.exports = {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteGenderByIds
}