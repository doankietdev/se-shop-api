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
const { validateCreateProduct } = require('~/api/v1/validations/product.validation')
const { uploadProductImageMiddleware } = require('~/api/v1/middlewares/upload.cloud.middleware')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllProducts)
router.get('/:id', getProductById)

router.use(authenticate)

router.post('/', uploadProductImageMiddleware, validateCreateProduct, createProduct)
router.delete('/', deleteProductByIds)

router.patch('/:id', updateProductById)
router.delete('/:id', deleteProductById)

module.exports = router