'use strict'

const SuccessResponse = require('~/core/success.response')
const orderService = require('~/api/v1/services/order.service')
const asyncHandling = require('~/core/async.handling')

const getOrder = asyncHandling( async (req, res) => {
  const { orderId, userId } = req.params

  new SuccessResponse({
    metadata: await orderService.getOrder({ userId, orderId })
  }).send(res)
})

const updateOrder = asyncHandling( async (req, res) => {
  const { orderId, userId } = req.params

  new SuccessResponse({
    metadata: await orderService.updateOrder({ userId, orderId, ...req.body })
  }).send(res)
})

const deleteOrder = asyncHandling( async (req, res) => {
  const { orderId, userId } = req.params

  new SuccessResponse({
    message: 'Delete order successfully',
    metadata: await orderService.deleteOrder({ userId, orderId })
  }).send(res)
})

const getAllOrders = asyncHandling( async (req, res) => {
  const { filter } = req

  new SuccessResponse({
    metadata: await orderService.getAllOrders(filter)
  }).send(res)
})

module.exports = {
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
}