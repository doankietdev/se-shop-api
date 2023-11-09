'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Token extends Model {
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
  sequelize: mysql.getInstance(),
  modelName: 'Token',
  tableName: 'Token'
})

module.exports = Token