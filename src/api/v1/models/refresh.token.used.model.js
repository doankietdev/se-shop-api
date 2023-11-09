'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class RefreshTokenUsed extends Model {}

RefreshTokenUsed.init({
  refreshTokenUsed: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'RefreshTokenUsed',
  tableName: 'RefreshTokenUsed'
})

module.exports = RefreshTokenUsed