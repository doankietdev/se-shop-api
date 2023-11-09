'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Token extends Model {}

Token.init({
  accessToken: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Token',
  tableName: 'Token'
})

module.exports = Token