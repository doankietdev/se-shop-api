'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {

    }
  }
  Gender.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gender',
    tableName: 'Gender'
  })
  return Gender
}