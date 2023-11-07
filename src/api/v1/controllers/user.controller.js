'use strict'

const userService = require('~/api/v1/services/user.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getAllUsers = asyncHandling(async (req, res) => {
  new SuccessResponse({
    metadata: await userService.getAllUsers()
  }).send(res)
})

module.exports = {
  getAllUsers
}