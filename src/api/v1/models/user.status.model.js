'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class UserStatus extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // define association here
  }
}
UserStatus.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'UserStatus',
  tableName: 'UserStatus'
})

module.exports = UserStatus
