'use strict'

const { Token } = require('~/api/v1/models')

const createToken = async ({ accessToken, refreshToken, userId }) => {
  return await Token.create({ accessToken, refreshToken, userId })
}

const getTokenByAccessToken = async ({ accessToken }) => {
  return await Token.findOne({
    where: { accessToken }
  })
}

const getTokenByRefreshToken = async ({ refreshToken }) => {
  return await Token.findOne({
    where: { refreshToken }
  })
}

const findOneToken = async (query = {}) => {
  return await Token.findOne(query)
}

const deleteTokenByRefreshToken = async ({ refreshToken }) => {
  const token = await Token.findOne({
    where: { refreshToken }
  })
  if (!token) return null

  return await token.destroy()
}

const deleteAll = async () => {
  return await Token.destroy({ where: {} })
}

module.exports = {
  createToken,
  getTokenByAccessToken,
  getTokenByRefreshToken,
  findOneToken,
  deleteTokenByRefreshToken,
  deleteAll
}