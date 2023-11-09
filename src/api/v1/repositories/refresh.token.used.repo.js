'use strict'

const RefreshTokenUsed = require('~/api/v1/models/refresh.token.used.model')

const createRefreshTokenUsed = async ({ refreshTokenUsed, userId }) => {
  return await RefreshTokenUsed.create({ refreshTokenUsed, userId })
}

const getAllUsedRefreshTokens = async () => {
  return await RefreshTokenUsed.findAll()
}

const getRefreshTokenUsed = async ({ refreshToken }) => {
  return await RefreshTokenUsed.findByPk(refreshToken)
}

module.exports = {
  createRefreshTokenUsed,
  getAllUsedRefreshTokens,
  getRefreshTokenUsed
}