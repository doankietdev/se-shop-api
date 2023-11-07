'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const authService = require('~/api/v1/services/auth.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')
const {
  app: { cookieATMaxAge, cookieRTMaxAge }
} = require('~/config/environment.config')

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

const signIn = asyncHandling(async (req, res) => {
  const { username, password } = req.body

  const result = await authService.signIn({ username, password })

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: cookieATMaxAge
  }).cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: cookieRTMaxAge
  })

  new SuccessResponse({
    metadata: result.user
  }).send(res)
})

module.exports = {
  signUp,
  signIn
}