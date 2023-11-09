'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

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
  sequelize: mysql.getInstance(),
  modelName: 'RefreshToken',
  tableName: 'RefreshToken'
})

module.exports = RefreshToken