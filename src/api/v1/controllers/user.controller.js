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

module.exports = {
  getAllUsers,
  updateUserById
}