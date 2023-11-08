'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefreshTokenUsed extends Model {
    static associate(models) {
      RefreshTokenUsed.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
  RefreshTokenUsed.init({
    refreshTokenUsed: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'RefreshTokenUsed',
    tableName: 'RefreshTokenUsed'
  })
  return RefreshTokenUsed
}