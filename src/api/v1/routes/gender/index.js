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


router.get('/', getAllGenders)
router.post('/', validateCreateGender, createGender)
router.delete('/', validateDeleteGenderByIds, deleteGenderByIds)

router.get('/:id', getGenderById)
router.patch('/:id', validateUpdateGenderById, updateGenderById)
router.delete('/:id', deleteGenderById)

module.exports = router