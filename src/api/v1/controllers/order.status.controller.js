'use strict'

const { StatusCodes } = require('http-status-codes')
const orderStatusService = require('~/api/v1/services/order.status.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createOrderStatus = asyncHandling(async (req, res) => {
  const { name } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create order status successfully',
    metadata: await orderStatusService.createOrderStatus({ name })
  }).send(res)
})

const getAllOrderStatuses = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    message: 'Get all order statuses successfully',
    metadata: await orderStatusService.getAllOrderStatuses({ filter, selector, pagination, sorter })
  }).send(res)
})

const getOrderStatusById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    message: 'Get order status successfully',
    metadata: await orderStatusService.getOrderStatusById(id)
  }).send(res)
})

const updateOrderStatusById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  new SuccessResponse({
    message: 'Update order status successfully',
    metadata: await orderStatusService.updateOrderStatusById(id, { name })
  }).send(res)
})

const deleteOrderStatusById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    message: 'Delete order status successfully',
    metadata: await orderStatusService.deleteOrderStatusById(id)
  }).send(res)
})

const deleteOrderStatusByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    message: 'Delete order statuses successfully',
    metadata: await orderStatusService.deleteOrderStatusByIds(ids)
  }).send(res)
})

module.exports = {
  createOrderStatus,
  getAllOrderStatuses,
  getOrderStatusById,
  updateOrderStatusById,
  deleteOrderStatusById,
  deleteOrderStatusByIds
}