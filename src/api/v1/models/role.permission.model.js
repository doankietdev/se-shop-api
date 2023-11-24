'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class RolePermission extends Model {}

RolePermission.init({
  roleId: {
    type: DataTypes.TINYINT,
    primaryKey: true
  },
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  userIdAssign: DataTypes.INTEGER
}, {
  sequelize: mysql.getInstance(),
  modelName: 'RolePermission',
  tableName: 'RolePermission'
})

module.exports = RolePermission