'use strict'

const userService = require('~/api/v1/services/user.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getAllUsers = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const users = await userService.getAllUsers({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all users successfully',
    metadata: { users }
  }).send(res)
})

const updateUserById = asyncHandling(async (req, res) => {
  const { id } = req.user
  const imageUrl = req?.file?.path

  const user = await userService.updateUserById(id, { ...req.body, imageUrl })

  new SuccessResponse({
    message: 'Update user successfully',
    metadata: { user }
  }).send(res)
})

const updateStatus = asyncHandling(async (req, res) => {
  const { id } = req.params
  const { userStatusId } = req.body

  const user = await userService.updateStatus({ id, userStatusId })

  new SuccessResponse({
    message: 'Update user status successfully',
    metadata: { user }
  }).send(res)
})

const deleteUserById = asyncHandling(async (req, res) => {
  const { id } = req.params

  const users = await userService.deleteUserById(id)

  new SuccessResponse({
    message: 'Delete user successfully',
    metadata: { users }
  }).send(res)
})

module.exports = {
  getAllUsers,
  updateUserById,
  updateStatus,
  deleteUserById
}