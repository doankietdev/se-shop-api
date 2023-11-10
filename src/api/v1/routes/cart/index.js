'use strict'

const express = require('express')
const {
  addProductToCart,
  getFullCartByUserId,
  reduceQuantityProduct
} = require('~/api/v1/controllers/cart.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/get-by-user-id', getFullCartByUserId)
router.post('/add-to-cart', addProductToCart)
router.post('/reduce-quantity-product', reduceQuantityProduct)

module.exports = router