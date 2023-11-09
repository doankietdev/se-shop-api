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

router.get('/', getAllProducts)
router.post('/', createProduct)
router.delete('/', deleteProductByIds)

router.get('/:id', getProductById)
router.patch('/:id', updateProductById)
router.delete('/:id', deleteProductById)

module.exports = router