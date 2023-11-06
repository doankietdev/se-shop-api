'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      User.belongsTo(models.UserStatus, {
        foreignKey: 'userStatusId',
        targetKey: 'id',
        as: 'userStatus'
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
    sequelize,
    modelName: 'User',
    tableName: 'User'
  })
  return User
}