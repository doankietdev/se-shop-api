'use strict'

const express = require('express')
const {
  validateCreateUserStatus,
  validateUpdateUserStatusById,
  validateDeleteUserStatusByIds
} = require('~/api/v1/validations/user.status.validation')
const {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteGenderByIds
}= require('~/api/v1/controllers/user.status.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllUserStatuses)
  .post(validateCreateUserStatus, createUserStatus)
  .delete(validateDeleteUserStatusByIds, deleteGenderByIds)

router.route('/:id')
  .get(getUserStatusById)
  .patch(validateUpdateUserStatusById, updateUserStatusById)
  .delete(deleteUserStatusById)

module.exports = router