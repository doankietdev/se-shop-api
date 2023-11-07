'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
  RefreshToken.init({
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'RefreshToken'
  })
  return RefreshToken
}