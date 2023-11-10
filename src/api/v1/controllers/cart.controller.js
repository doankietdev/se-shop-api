'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const cartService = require('~/api/v1/services/cart.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const addProductToCart = asyncHandling(async (req, res) => {
  const { id } = req.user

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await cartService.addProductToCart({ ...req.body, userId: id })
  }).send(res)
})

const getFullCartByUserId = asyncHandling(async (req, res) => {
  const { id } = req.user

  new SuccessResponse({
    metadata: await cartService.getFullCartByUserId(id)
  }).send(res)
})

module.exports = {
  addProductToCart,
  getFullCartByUserId
}