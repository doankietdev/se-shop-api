'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {

    }
  }
  ProductType.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductType',
    tableName: 'ProductType'
  })
  return ProductType
}