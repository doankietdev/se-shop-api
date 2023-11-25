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
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllUserStatuses)
router.post('/', validateCreateUserStatus, createUserStatus)
router.delete('/', validateDeleteUserStatusByIds, deleteGenderByIds)

router.get('/:id', getUserStatusById)
router.patch('/:id', validateUpdateUserStatusById, updateUserStatusById)
router.delete('/:id', deleteUserStatusById)

module.exports = router