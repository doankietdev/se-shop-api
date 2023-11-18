'use strict'

const express = require('express')
const {
  review,
  order,
  getAllOrders,
  cancelOrder,
  getOrder,
  createPaymentUrl,
  checkPay
} = require('~/api/v1/controllers/checkout.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/get-all-orders', queryStringMiddleware, getAllOrders)
router.get('/get-order/:orderId', getOrder)
router.get('/check-pay', checkPay)
router.post('/review', review)
router.post('/order', order)
router.post('/cancel-order/:orderId', cancelOrder)
router.post('/create-payment-url', createPaymentUrl)

module.exports = router