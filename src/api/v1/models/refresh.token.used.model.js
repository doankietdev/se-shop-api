'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

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
  sequelize: mysql.getInstance(),
  modelName: 'RefreshTokenUsed',
  tableName: 'RefreshTokenUsed'
})

module.exports = RefreshTokenUsed