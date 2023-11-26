'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class CorsDomain extends Model {}

CorsDomain.init({
  domain: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'CorsDomain',
  tableName: 'CorsDomain'
})

module.exports = CorsDomain