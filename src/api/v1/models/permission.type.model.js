'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class PermissionType extends Model {}

PermissionType.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'PermissionType',
  tableName: 'PermissionType'
})

module.exports = PermissionType