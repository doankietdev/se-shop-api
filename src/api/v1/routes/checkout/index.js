'use strict'

const express = require('express')
const {
  review,
  order,
  getAllOrders,
  cancelOrder,
  getOrder,
  pay,
  checkPay
} = require('~/api/v1/controllers/checkout.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/get-all-orders', queryStringMiddleware, getAllOrders)
router.get('/get-order', getOrder)
router.get('/check-pay', checkPay)
router.get('/review', review)
router.post('/order', order)
router.post('/cancel-order', cancelOrder)
router.post('/pay', pay)

module.exports = router