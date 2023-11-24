'use strict'

const { StatusCodes } = require('http-status-codes')
const rolePermissionService = require('~/api/v1/services/role.permission.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createRolePermission = asyncHandling(async (req, res) => {
  const { roleId, permissionId, userIdAssign } = req.body

  const rolePermission = await rolePermissionService.createRolePermission({ roleId, permissionId, userIdAssign })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Asign permission successfully',
    metadata: { rolePermission }
  }).send(res)
})

const getAllRolePermissions = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const assignedPermissions = await rolePermissionService.getAllRolePermissions({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all assigned permissions successfully',
    metadata: { assignedPermissions }
  }).send(res)
})

// const getPermissionById = asyncHandling(async (req, res) => {
//   const { id } = req.params

//   const permission = await resourceService.getPermissionById(id)

//   new SuccessResponse({
//     message: 'Get permission successfully',
//     metadata: { permission }
//   }).send(res)
// })

// const updatePermissionById = asyncHandling( async (req, res) => {
//   const { id } = req.params
//   const { name, description, api, method, permissionTypeId, resourceId } = req.body

//   const permission = await resourceService.updatePermissionById(id, { name, description, api, method, permissionTypeId, resourceId })

//   new SuccessResponse({
//     message: 'Update permission successfully',
//     metadata: { permission }
//   }).send(res)
// })

// const deletePermissionById = asyncHandling(async (req, res) => {
//   const { id } = req.params

//   const permissions = await resourceService.deletePermissionById(id)

//   new SuccessResponse({
//     message: 'Delete permission successfully',
//     metadata: { permissions }
//   }).send(res)
// })

// const deletePermissionByIds = asyncHandling(async (req, res) => {
//   const { ids } = req.body

//   const permissions = await resourceService.deletePermissionByIds(ids)

//   new SuccessResponse({
//     message: 'Delete some permissions successfully',
//     metadata: { permissions }
//   }).send(res)
// })

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  // getPermissionById,
  // updatePermissionById,
  // deletePermissionById,
  // deletePermissionByIds
}