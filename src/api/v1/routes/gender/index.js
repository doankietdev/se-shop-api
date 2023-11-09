'use strict'

const express = require('express')
const {
  validateCreateGender,
  validateUpdateGenderById,
  validateDeleteGenderByIds
} = require('~/api/v1/validations/gender.validation')
const {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
}= require('~/api/v1/controllers/gender.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')
const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllGenders)
  .post(validateCreateGender, createGender)
  .delete(validateDeleteGenderByIds, deleteGenderByIds)

router.route('/:id')
  .get(getGenderById)
  .patch(validateUpdateGenderById, updateGenderById)
  .delete(deleteGenderById)

module.exports = router