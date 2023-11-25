'use strict'

const express = require('express')
const {
  addProductToCart,
  getFullCartByUserId,
  reduceQuantityProduct
} = require('~/api/v1/controllers/cart.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/get-by-user-id', queryStringMiddleware, getFullCartByUserId)
router.post('/add-to-cart', addProductToCart)
router.post('/reduce-quantity-product', reduceQuantityProduct)

module.exports = router