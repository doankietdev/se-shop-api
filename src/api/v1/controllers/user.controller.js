'use strict'

const userService = require('~/api/v1/services/user.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getAllUsers = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    metadata: await userService.getAllUsers({ filter, selector, pagination, sorter })
  }).send(res)
})

const updateUserById = asyncHandling(async (req, res) => {
  const { id } = req.user
  const imageUrl = req?.file?.path

  new SuccessResponse({
    metadata: await userService.updateUserById(id, { ...req.body, imageUrl })
  }).send(res)
})

const updateStatus = asyncHandling(async (req, res) => {
  const { id } = req.params
  const { userStatusId } = req.body

  new SuccessResponse({
    message: 'Update user status successfully',
    metadata: await userService.updateStatus({ id, userStatusId })
  }).send(res)
})

const deleteUserById = asyncHandling(async (req, res) => {
  const { id } = req.params

  console.log({ id });

  new SuccessResponse({
    message: 'Delete user successfully',
    metadata: await userService.deleteUserById(id)
  }).send(res)
})

module.exports = {
  getAllUsers,
  updateUserById,
  updateStatus,
  deleteUserById
}