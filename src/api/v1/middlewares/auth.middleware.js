'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const { REQUEST_HEADER_KEYS } = require('~/config/constants.config')
const tokenRepo = require('~/api/v1/repositories/token.repo')
const userRepo = require('~/api/v1/repositories/user.repo')
const { verifyToken } = require('~/api/v1/utils/auth.util')

const authenticate = asyncHandling(async (req, res, next) => {
  const userId = Number(req.headers[REQUEST_HEADER_KEYS.userId])
  if (!userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  const { accessToken } = req.cookies
  if (!accessToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  const foundToken = tokenRepo.getTokenByAccessToken({ accessToken })
  if (!foundToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const foundUser = await userRepo.getUser({ id: userId })
  if (!foundUser) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  try {
    const decoded = verifyToken({ token: accessToken, publicKey: foundUser.publicKey })
    if (decoded.userId !== userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    req.user = foundUser
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, error.message)
  }
})

module.exports = {
  authenticate
}