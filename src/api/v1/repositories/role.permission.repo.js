'use strict'

const { RolePermission, Role, Permission, PermissionType, Resource, User } = require('~/api/v1/models')

const getAllRolePermissions = async ({ filter = null, selector = null, pagination = null, sorter = null }) => {
  return await RolePermission.findAll({
    where: filter,
    attributes: selector ? selector : {
      exclude: ['roleId', 'permissionId', 'assignerId']
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
        as: 'assigner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ],
    offset: pagination?.skip || null,
    limit: pagination?.limit || null,
    order: sorter
  })
}

module.exports = {
  getAllRolePermissions
}