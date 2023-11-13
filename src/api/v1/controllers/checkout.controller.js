'use strict'

const SuccessResponse = require('~/core/success.response')
const checkoutService = require('~/api/v1/services/checkout.service')
const asyncHandling = require('~/core/async.handling')
const { app: { paySuccessUrl, payFailUrl } } = require('~/config/environment.config')

const review = asyncHandling(async (req, res) => {
  const { orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkoutService.review({ orderProducts })
  }).send(res)
})

const order = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { shipAddress, phoneNumber, paymentFormId, orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkoutService.order({ userId: id, shipAddress, phoneNumber, paymentFormId, orderProducts })
  }).send(res)
})

const getAllOrders = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { status, paymentForm } = req.query

  new SuccessResponse({
    metadata: await checkoutService.getAllOrders({ userId: id, orderStatusName: status, paymentFormName: paymentForm })
  }).send(res)
})

const cancelOrder = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { orderId } = req.params

  new SuccessResponse({
    message: 'Cancel order successfully',
    metadata: await checkoutService.cancelOrder({ userId: id, orderId })
  }).send(res)
})

const getOrder = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { orderId } = req.params

  new SuccessResponse({
    message: 'Cancel order successfully',
    metadata: await checkoutService.getOrder({ userId: id, orderId })
  }).send(res)
})

const createPaymentUrl = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { orderId, bankCode } = req.body
  const ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  new SuccessResponse({
    message: 'Pay successfully',
    metadata: await checkoutService.createPaymentUrl({ userId: id, bankCode, orderId, ipAddr })
  }).send(res)
})

const checkPay = asyncHandling(async (req, res) => {
  const vnpParams = req.query

  const isSuccess = await checkoutService.checkPay(vnpParams)

  if (isSuccess) return res.redirect(paySuccessUrl)
  return res.redirect(payFailUrl)
})

module.exports = {
  review,
  order,
  getAllOrders,
  cancelOrder,
  getOrder,
  createPaymentUrl,
  checkPay
}