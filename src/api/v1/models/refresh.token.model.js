'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    // eslint-disable-next-line no-unused-vars
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