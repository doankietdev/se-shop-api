'use strict'

const express = require('express')
const {
  validateCreateCategory,
  validateUpdateCategoryById,
  validateDeleteCategoryByIds
} = require('~/api/v1/validations/category.validation')
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByIds,
  getProductsByCategoryId
}= require('~/api/v1/controllers/category.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)


router.get('/', getAllCategories)
router.post('/', validateCreateCategory, createCategory)
router.delete('/', validateDeleteCategoryByIds, deleteCategoryByIds)

router.get('/:id', getCategoryById)
router.get('/:id/get-products', getProductsByCategoryId)
router.patch('/:id', validateUpdateCategoryById, updateCategoryById)
router.delete('/:id', deleteCategoryById)

module.exports = router