'use strict'

const express = require('express')
const {
  createOrderStatus,
  getAllOrderStatuses,
  getOrderStatusById,
  updateOrderStatusById,
  deleteOrderStatusById,
  deleteOrderStatusByIds
} = require('~/api/v1/controllers/order.status.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const router = express.Router()

router.get('/', queryStringMiddleware, getAllOrderStatuses)
router.post('/', createOrderStatus)
router.delete('/', deleteOrderStatusByIds)
router.get('/:id', getOrderStatusById)
router.patch('/:id', updateOrderStatusById)
router.delete('/:id', deleteOrderStatusById)

module.exports = router