'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Role extends Model {}

Role.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Role',
  tableName: 'Role'
})

module.exports = Role