'use strict'

const ResetToken = require('~/api/v1/models/reset.token.model')

const createResetToken = async ({ resetToken, userId }) => {
  return await ResetToken.create({ resetToken, userId })
}

const getResetToken = async (query = {}) => {
  return await ResetToken.findOne(query)
}

const deleteResetToken = async ({ resetToken }) => {
  const foundResetToken = await ResetToken.findOne({
    where: { resetToken }
  })
  if (!foundResetToken) return null

  return await foundResetToken.destroy()
}

module.exports = {
  createResetToken,
  getResetToken,
  deleteResetToken
}