'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Resource extends Model {}

Resource.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Resource',
  tableName: 'Resource'
})

module.exports = Resource