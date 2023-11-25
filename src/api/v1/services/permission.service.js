'use strict'

const { Permission } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createPermission = async ({ name, description, api, method, permissionTypeId, resourceId }) => {
  try {
    return await Permission.create({ name, description, api, method, permissionTypeId, resourceId })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create permission failed')
  }
}

const getAllPermissions = async ({ filter = null, selector = null, pagination = null, sorter = null }) => {
  try {
    return await Permission.findAll({
      where: filter,
      attributes: selector,
      offset: pagination?.skip || null,
      limit: pagination?.limit || null,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get all resources failed')
  }
}

const getPermissionById = async (id) => {
  const permission = await Permission.findByPk(id)
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  return permission
}

const updatePermissionById = async (id, { name, description, api, method, permissionTypeId, resourceId }) => {
  const permission = await Permission.findOne({
    where: { id }
  })
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  return await permission.update({ name, description, api, method, permissionTypeId, resourceId })
}

const deletePermissionById = async (id) => {
  const permission = await Permission.findByPk(id)
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  const { dataValues } = await permission.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete permission failed')
  return await getAllPermissions({})
}

const deletePermissionByIds = async (ids) => {
  const numberDeletedItems = await Permission.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No Permissions are deleted')
  return await getAllPermissions({})
}

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  deletePermissionByIds
}