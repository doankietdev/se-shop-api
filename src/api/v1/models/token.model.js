'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
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
    sequelize,
    modelName: 'Token',
    tableName: 'Token'
  })
  return Token
}