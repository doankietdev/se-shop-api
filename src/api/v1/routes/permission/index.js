'use strict'

const express = require('express')
const {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  deletePermissionByIds
}= require('~/api/v1/controllers/permission.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllPermissions)
router.post('/', createPermission)
router.delete('/', deletePermissionByIds)
router.get('/:id', getPermissionById)
router.patch('/:id', updatePermissionById)
router.delete('/:id', deletePermissionById)

module.exports = router