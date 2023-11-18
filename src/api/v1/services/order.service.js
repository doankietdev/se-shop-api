'use strict'

const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const { Order, OrderStatus, PaymentForm, User } = require('~/api/v1/models')
const orderRepo = require('~/api/v1/repositories/order.repo')
const orderDetailRepo = require('~/api/v1/repositories/order.detail.repo')

const getAllOrders = async ({ userId, orderStatusName, paymentFormName }) => {
  return await orderRepo.getAllOrders({ userId, orderStatusName, paymentFormName })
}

const getOrder = async ({ userId, orderId }) => {
  const foundOrder = await Order.findOne({
    where: { userId, id: orderId },
    attributes: {
      exclude: ['orderStatusId', 'paymentFormId', 'userId']
    },
    include: [
      { model: OrderStatus, as: 'orderStatus', attributes: ['id', 'name'] },
      { model: PaymentForm, as: 'paymentForm', attributes: ['id', 'name'] },
      { model: User, as: 'user', attributes: ['id', 'lastName', 'firstName'] }
    ]
  })
  if (!foundOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
  return foundOrder
}

const updateOrder = async ({ userId, orderId, ...reqBody }) => {
  const foundOrder = await Order.findOne({
    where: { userId, id: orderId }
  })
  if (!foundOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')

  return await foundOrder.update({ ...reqBody })
}

const deleteOrder = async ({ userId, orderId }) => {
  const foundOrder = await Order.findOne({
    where: { userId, id: orderId }
  })
  if (!foundOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')

  await orderDetailRepo.deleteOrderDetailByOrderId(foundOrder.id)

  return await foundOrder.destroy()
}

module.exports = {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
}