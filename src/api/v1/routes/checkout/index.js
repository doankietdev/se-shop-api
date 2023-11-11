'use strict'

const express = require('express')
const {
  review,
  order,
  getAllOrders,
  cancelOrder
} = require('~/api/v1/controllers/checkout.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/get-all-orders', getAllOrders)
router.post('/review', review)
router.post('/order', order)
router.post('/cancel-order', cancelOrder)

module.exports = router