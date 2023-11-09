'use strict'

const express = require('express')
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProductByIds
}= require('~/api/v1/controllers/product.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteProductByIds)

router.route('/:id')
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById)

module.exports = router