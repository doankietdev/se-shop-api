'use strict'

const express = require('express')
const { getOrder, updateOrder, deleteOrder } = require('~/api/v1/controllers/order.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/:orderId/:userId', getOrder)
router.patch('/:orderId/:userId', updateOrder)
router.delete('/:orderId/:userId', deleteOrder)

module.exports = router