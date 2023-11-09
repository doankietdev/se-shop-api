'use strict'

const express = require('express')
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
  .post(createProductType)
  .delete(deleteProductTypeByIds)

router.route('/:id')
  .get(getProductTypeById)
  .patch(updateProductTypeById)
  .delete(deleteProductTypeById)

module.exports = router