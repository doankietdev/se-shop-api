'use strict'

const express = require('express')
const {
  validateCreateProductType,
  validateUpdateProductTypeById,
  validateDeleteProductTypeByIds
} = require('~/api/v1/validations/product.type.validation')
const {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductTypeById,
  deleteProductTypeById,
  deleteProductTypeByIds
}= require('~/api/v1/controllers/product.type.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllProductTypes)
  .post(validateCreateProductType, createProductType)
  .delete(validateDeleteProductTypeByIds, deleteProductTypeByIds)

router.route('/:id')
  .get(getProductTypeById)
  .patch(validateUpdateProductTypeById, updateProductTypeById)
  .delete(deleteProductTypeById)

module.exports = router