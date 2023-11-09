'use strict'

const express = require('express')
const {
  validateCreateRole,
  validateUpdateRoleById,
  validateDeleteRoleByIds
} = require('~/api/v1/validations/role.validation')
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}= require('~/api/v1/controllers/role.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.route('/')
  .get(getAllRoles)
  .post(validateCreateRole, createRole)
  .delete(validateDeleteRoleByIds, deleteRoleByIds)

router.route('/:id')
  .get(getRoleById)
  .patch(validateUpdateRoleById, updateRoleById)
  .delete(deleteRoleById)

module.exports = router