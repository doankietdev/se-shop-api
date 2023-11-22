'use strict'

const userService = require('~/api/v1/services/user.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getAllUsers = asyncHandling(async (req, res) => {
  new SuccessResponse({
    metadata: await userService.getAllUsers()
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