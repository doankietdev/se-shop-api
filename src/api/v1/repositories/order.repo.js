'use strict'

const { Order } = require('~/api/v1/models')

const createOrder = async ({ shipAddress, userId, paymentFormId, orderStatusId }) => {
  return await Order.create({
    shipAddress,
    userId,
    paymentFormId,
    orderStatusId
  })
}

module.exports = {
  createOrder
}