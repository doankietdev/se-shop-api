'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      AccessToken.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })
    }
  }
  AccessToken.init({
    accessToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccessToken',
    tableName: 'AccessToken'
  })
  return AccessToken
}