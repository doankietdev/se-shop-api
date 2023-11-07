'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const authService = require('~/api/v1/services/auth.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const signUp = asyncHandling(async (req, res) => {
  const {
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password
  } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await authService.signUp({
      genderId, lastName, firstName, phoneNumber,
      email, address, username, password
    })
  }).send(res)
})

module.exports = {
  signUp
}