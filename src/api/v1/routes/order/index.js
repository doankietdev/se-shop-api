'use strict'

const express = require('express')
const { getOrder, updateOrder, deleteOrder, getAllOrders } = require('~/api/v1/controllers/order.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/', queryStringMiddleware, getAllOrders)
router.get('/:orderId/:userId', getOrder)
router.patch('/:orderId/:userId', updateOrder)
router.delete('/:orderId/:userId', deleteOrder)

module.exports = router