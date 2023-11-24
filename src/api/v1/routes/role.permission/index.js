'use strict'

const express = require('express')
const {
  createRolePermission,
  getAllRolePermissions
}= require('~/api/v1/controllers/role.permission.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.get('/', queryStringMiddleware, getAllRolePermissions)
router.post('/assign-permissions', createRolePermission)
// router.delete('/', deletePermissionByIds)

// router.get('/:id', getPermissionById)
// router.patch('/:id', updatePermissionById)
// router.delete('/:id', deletePermissionById)

module.exports = router