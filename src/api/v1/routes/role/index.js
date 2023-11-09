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

router.get('/', getAllRoles)
router.post('/', validateCreateRole, createRole)
router.delete('/', validateDeleteRoleByIds, deleteRoleByIds)

router.get('/:id', getRoleById)
router.patch('/:id', validateUpdateRoleById, updateRoleById)
router.delete('/:id', deleteRoleById)

module.exports = router