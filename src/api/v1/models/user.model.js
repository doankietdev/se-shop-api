'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class User extends Model {
  static associate(models) {
    User.belongsTo(models.UserStatus, {
      foreignKey: 'userStatusId',
      targetKey: 'id',
      as: 'status'
    })

    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      targetKey: 'id',
      as: 'role'
    })

    User.belongsTo(models.Gender, {
      foreignKey: 'genderId',
      targetKey: 'id',
      as: 'gender'
    })
  }
}
User.init({
  userStatusId: DataTypes.TINYINT,
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  publicKey: DataTypes.STRING,
  privateKey: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'User',
  tableName: 'User'
})

module.exports = User