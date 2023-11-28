'use strict'

const express = require('express')
const {
  addProductToCart,
  getFullCartForCustomer,
  reduceQuantityProduct,
  increaseQuantityProduct
} = require('~/api/v1/controllers/cart.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/get-my-cart', queryStringMiddleware, getFullCartForCustomer)
router.post('/add-to-cart', addProductToCart)
router.post('/reduce-quantity-product', reduceQuantityProduct)
router.post('/increase-quantity-product', increaseQuantityProduct)

module.exports = router