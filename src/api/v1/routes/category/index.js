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
  deleteCategoryByIds
}= require('~/api/v1/controllers/category.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllCategories)
  .post(validateCreateCategory, createCategory)
  .delete(validateDeleteCategoryByIds, deleteCategoryByIds)

router.route('/:id')
  .get(getCategoryById)
  .patch(validateUpdateCategoryById, updateCategoryById)
  .delete(deleteCategoryById)

module.exports = router