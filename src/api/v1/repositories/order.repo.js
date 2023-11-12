'use strict'

const { Order, OrderStatus, PaymentForm, OrderDetail, Product } = require('~/api/v1/models')
const { Op } = require('sequelize')

const createOrder = async ({ shipAddress, phoneNumber, userId, paymentFormId, orderStatusId }) => {
  return await Order.create({
    shipAddress,
    phoneNumber,
    userId,
    paymentFormId,
    orderStatusId
  }, {
    raw: true
  })
}

const getAllOrders = async ({ userId, orderStatusName, paymentFormName }) => {
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
        where: orderStatusName ? { name: { [Op.regexp]: `^${orderStatusName}$` } } : null
      },
      {
        model: PaymentForm,
        as: 'paymentForm',
        attributes: ['id', 'name'],
        where: paymentFormName ? { name: { [Op.regexp]: `^${paymentFormName}$` } } : null
      },
      {
        model: OrderDetail,
        as: 'products',
        attributes: {
          exclude: ['orderId', 'productId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'description', 'imageUrl']
          }
        ]
      }
    ]
  })
}

const getOrderWithQuery = async (query = {}) => {
  return Order.findOne(query)
}

const deleteOrder = async ({ userId, orderId }) => {
  return await Order.destroy({
    where: { userId, id: orderId }
  })
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderWithQuery,
  deleteOrder
}