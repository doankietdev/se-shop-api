'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const SuccessResponse = require('~/core/success.response')
const checkOutService = require('~/api/v1/services/checkout.service')
const asyncHandling = require('~/core/async.handling')

const review = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { cartId, orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkOutService.review({ userId: id, cartId, orderProducts })
  }).send(res)
})

const order = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { shipAddress, paymentFormId, orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkOutService.order({ userId: id, shipAddress, paymentFormId, orderProducts })
  }).send(res)
})

module.exports = {
  review,
  order
}