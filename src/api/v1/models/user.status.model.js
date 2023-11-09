'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class UserStatus extends Model {}

UserStatus.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'UserStatus',
  tableName: 'UserStatus'
})

module.exports = UserStatus
