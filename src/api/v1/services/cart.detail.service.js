'use strict'

const CartDetail = require('~/api/v1/models/cart.detail.model')

const createCartDetail = async (reqBody = {}) => {
  return await CartDetail.create(reqBody)
}

module.exports = {
  createCartDetail
}