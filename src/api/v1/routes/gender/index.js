'use strict'

const express = require('express')
const {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
}= require('~/api/v1/controllers/gender.controller')

const router = express.Router()

router.route('/')
  .get(getAllGenders)
  .post(createGender)
  .delete(deleteGenderByIds)

router.route('/:id')
  .get(getGenderById)
  .patch(updateGenderById)
  .delete(deleteGenderById)

module.exports = router