'use strict'

const { OrderDetail } = require('~/api/v1/models')

const createOrderDetail = async ({ quantity, price, orderId, productId }) => {
  return await OrderDetail.create({
    quantity,
    price,
    orderId,
    productId
  })
}

module.exports = {
  createOrderDetail
}