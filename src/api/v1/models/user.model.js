'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class User extends Model {}

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