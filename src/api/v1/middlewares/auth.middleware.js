'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const { REQUEST_HEADER_KEYS } = require('~/config/constants.config')
const tokenRepo = require('~/api/v1/services/token.service')
const userRepo = require('~/api/v1/repositories/user.repo')
const rolePermissionRepo = require('~/api/v1/repositories/role.permission.repo')
const { verifyToken } = require('~/api/v1/utils/auth.util')

const authenticate = asyncHandling(async (req, res, next) => {
  const userId = Number(req.headers[REQUEST_HEADER_KEYS.userId])
  if (!userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  const { accessToken } = req.cookies
  if (!accessToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const foundToken = await tokenRepo.getTokenByAccessToken({ accessToken })
  if (!foundToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const foundUser = await userRepo.getUserById(userId)
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

const authorize = asyncHandling(async (req, res, next) => {
  // get roleId
  const { roleId } = req.user
  // get reqApi and method from req
  const reqUrl = req.baseUrl
  const reqMethod = req.method

  const accessControlList = await rolePermissionRepo.getAllRolePermissionsByRoleId(roleId, {})

  const hasPermission = accessControlList.some(({ permission }) => {
    return reqUrl === permission.api && reqMethod === permission.method
  })

  if (hasPermission) return next()
  next(new ApiError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN))
})

module.exports = {
  authenticate,
  authorize
}