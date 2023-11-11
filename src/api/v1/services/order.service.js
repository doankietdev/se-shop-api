'use strict'

const orderRepo = require('~/api/v1/repositories/order.repo')

const getAllOrders = async ({ userId, orderStatusName }) => {
  return await orderRepo.getAllOrders({ userId, orderStatusName })
}

module.exports = {
  getAllOrders
}