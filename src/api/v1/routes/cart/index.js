'use strict'

const express = require('express')
const {
  addProductToCart
}= require('~/api/v1/controllers/cart.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.post('/add-to-cart', addProductToCart)

module.exports = router