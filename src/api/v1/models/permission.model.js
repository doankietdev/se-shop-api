'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Permission extends Model {}

Permission.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  api: DataTypes.STRING,
  method: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Permission',
  tableName: 'Permission'
})

module.exports = Permission