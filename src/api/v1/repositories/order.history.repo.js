'use strict'

const { OrderHistory } = require('~/api/v1/models')

const createOrderStatusHistory = async ({ orderId, statusId }) => {
  return await OrderHistory.create({
    orderId,
    statusId
  })
}

const getOrderHistory = async (orderId) => {
  return await OrderHistory.findAll({
    where: { orderId }
  })
}

const getOrderHistoryByStatus = async ({ orderId, statusId }) => {
  return await OrderHistory.findOne({
    where: { orderId, statusId }
  })
}

module.exports = {
  createOrderStatusHistory,
  getOrderHistory,
  getOrderHistoryByStatus
}
