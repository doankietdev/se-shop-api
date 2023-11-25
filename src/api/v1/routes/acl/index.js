'use strict'

const express = require('express')
const {
  assignPermission,
  getAccessControlList,
  getAccessControlByRoleIdPermissionId,
  getAccessControlListByRoleId,
  getAccessControlListByPermissionId,
  getAccessControlListByAssignerId,
  updateAccessControl,
  unassignPermission,
  unassignPermissions
} = require('~/api/v1/controllers/acl.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAccessControlList)
router.delete('/unassign-permissions', unassignPermissions)
router.get('/get-by-role-id/:roleId', queryStringMiddleware, getAccessControlListByRoleId)
router.get('/get-by-permission-id/:permissionId', queryStringMiddleware, getAccessControlListByPermissionId)
router.get('/get-by-assigner-id/:assignerId', queryStringMiddleware, getAccessControlListByAssignerId)
router.post('/assign-permission', assignPermission)
router.get('/:roleId/:permissionId', getAccessControlByRoleIdPermissionId)
router.patch('/:roleId/:permissionId', updateAccessControl)
router.delete('/unassign-permission/:roleId/:permissionId', unassignPermission)

module.exports = router