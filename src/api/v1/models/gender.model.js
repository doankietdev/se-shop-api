'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Gender extends Model {}

Gender.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Gender',
  tableName: 'Gender'
})

module.exports = Gender