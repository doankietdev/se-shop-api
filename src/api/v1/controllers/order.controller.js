'use strict'

const SuccessResponse = require('~/core/success.response')
const orderService = require('~/api/v1/services/order.service')
const asyncHandling = require('~/core/async.handling')

const getOrder = asyncHandling( async (req, res) => {
  const { orderId, userId } = req.query

  const order = await orderService.getOrder({ userId, orderId })

  new SuccessResponse({
    message: 'Get order successfully',
    metadata: { order }
  }).send(res)
})

const updateOrderStatus = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { orderStatusId } = req.body

  const order = await orderService.updateOrder(id, { orderStatusId })

  new SuccessResponse({
    metadata: { order }
  }).send(res)
})

// const updateOrderStatus = asyncHandling( async (req, res) => {
//   const { id } = req.query

//   const { orderStatusId }

//   const order = await orderService.updateOrder(id, req.body)

//   new SuccessResponse({
//     metadata: { order }
//   }).send(res)
// })

const deleteOrder = asyncHandling( async (req, res) => {
  const { id } = req.query

  await orderService.deleteOrder(id)

  new SuccessResponse({
    message: 'Delete order successfully'
  }).send(res)
})

const getAllOrders = asyncHandling( async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const orders = await orderService.getAllOrders({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all orders successfully',
    metadata: { orders }
  }).send(res)
})

module.exports = {
  getOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}