'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Gender extends Model {
  // eslint-disable-next-line no-unused-vars
  static associate(models) {

  }
}
Gender.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Gender',
  tableName: 'Gender'
})

module.exports = Gender