'use strict'

const { StatusCodes } = require('http-status-codes')
const cartService = require('~/api/v1/services/cart.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getFullCartForCustomer = asyncHandling(async (req, res) => {
  const id = req?.user?.id || null
  const { filter, selector, pagination, sorter } = req

  const cart = await cartService.getFullCartByUserId(id, { filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get cart successfully',
    metadata: { cart }
  }).send(res)
})

const addProductToCart = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const cart = await cartService.addProductToCart({ ...req.body, userId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Add product to cart successfully',
    metadata: { cart }
  }).send(res)
})

const reduceQuantityProduct = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const cart = await cartService.reduceQuantityProduct({ ...req.body, userId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Reduce quantity of product successfully',
    metadata: { cart }
  }).send(res)
})

const increaseQuantityProduct = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const cart = await cartService.increaseQuantityProduct({ ...req.body, userId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Increase quantity of product successfully',
    metadata: { cart }
  }).send(res)
})

const deleteProductFromCart = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const { cartId, productId } = req.query

  const cart = await cartService.deleteProductFromCart({ cartId, userId, productId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Delete product from cart successfully',
    metadata: { cart }
  }).send(res)
})

module.exports = {
  getFullCartForCustomer,
  addProductToCart,
  reduceQuantityProduct,
  increaseQuantityProduct,
  deleteProductFromCart
}