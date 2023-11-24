'use strict'

const { RolePermission, Role, Permission, User, PermissionType, Resource } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')


const createRolePermission = async ({ roleId, permissionId, userIdAssign }) => {
  try {
    return await RolePermission.create({ roleId, permissionId, userIdAssign })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Assign permission failed')
  }
}

const getAllRolePermissions = async ({ filter = null, selector = null, pagination = null, sorter = null }) => {
  try {
    return await RolePermission.findAll({
      where: {
        '$role.name$': 'customer'
      },
      attributes: selector ? selector : {
        exclude: ['roleId', 'permissionId', 'userIdAssign']
      },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
        },
        {
          model: Permission,
          as: 'permission',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: PermissionType,
              as: 'permissionType',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
              model: Resource,
              as: 'resource',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
          ]
        },
        { model: User,
          as: 'asignedBy',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      offset: pagination?.skip || null,
      limit: pagination?.limit || null,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get all assigned permissions failed')
  }
}

// const getPermissionById = async (id) => {
//   const permission = await Permission.findByPk(id)
//   if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
//   return permission
// }

// const updatePermissionById = async (id, { name, description, api, method, permissionTypeId, resourceId }) => {
//   const permission = await Permission.findOne({
//     where: { id }
//   })
//   if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Oermission not found')
//   return await permission.update({ name, description, api, method, permissionTypeId, resourceId })
// }

// const deletePermissionById = async (id) => {
//   const permission = await Permission.findByPk(id)
//   if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
//   const { dataValues } = await permission.destroy()
//   if (!dataValues) throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete permission failed')
//   return await getAllPermissions({})
// }

// const deletePermissionByIds = async (ids) => {
//   const numberDeletedItems = await Permission.destroy({
//     where: { id: ids }
//   })
//   const NO_ITEMS_DELETEDS = 0
//   if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No Permissions are deleted')
//   return await getAllPermissions({})
// }

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  // getPermissionById,
  // updatePermissionById,
  // deletePermissionById,
  // deletePermissionByIds
}