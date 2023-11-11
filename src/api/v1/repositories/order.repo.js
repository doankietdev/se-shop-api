'use strict'

const { Order, OrderStatus, PaymentForm } = require('~/api/v1/models')

const createOrder = async ({ shipAddress, userId, paymentFormId, orderStatusId }) => {
  return await Order.create({
    shipAddress,
    userId,
    paymentFormId,
    orderStatusId
  })
}

const getAllOrders = async ({ userId, orderStatusName }) => {
  return await Order.findAll({
    where: { userId },
    attributes: {
      exclude: ['orderStatusId', 'paymentFormId', 'userId']
    },
    include: [
      {
        model: OrderStatus,
        as: 'orderStatus',
        attributes: ['id', 'name'],
        where: { name: orderStatusName }
      },
      {
        model: PaymentForm,
        as: 'paymentForm',
        attributes: ['id', 'name']
      }
    ],
    raw: true,
    nest: true
  })
}

module.exports = {
  createOrder,
  getAllOrders
}