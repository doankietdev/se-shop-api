'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefreshTokenUsed extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      RefreshTokenUsed.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
  RefreshTokenUsed.init({
    refreshTokenUsed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RefreshTokenUsed',
    tableName: 'RefreshTokenUsed'
  })
  return RefreshTokenUsed
}