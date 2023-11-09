'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ResetToken extends Model {
    static associate(models) {
      ResetToken.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
  ResetToken.init({
    resetToken: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'ResetToken',
    tableName: 'ResetToken'
  })
  return ResetToken
}