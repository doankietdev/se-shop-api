'use strict'

const { CartDetail } = require('~/api/v1/models')

const createCartDetail = async (reqBody = {}) => {
  return await CartDetail.create(reqBody)
}

module.exports = {
  createCartDetail
}