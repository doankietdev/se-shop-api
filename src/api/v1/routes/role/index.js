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
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllRoles)
router.post('/', validateCreateRole, createRole)
router.delete('/', validateDeleteRoleByIds, deleteRoleByIds)
router.get('/:id', getRoleById)
router.patch('/:id', validateUpdateRoleById, updateRoleById)
router.delete('/:id', deleteRoleById)

module.exports = router