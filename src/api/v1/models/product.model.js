'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Product.belongsTo(models.ProductType, {
        foreignKey: 'productTypeId',
        targetKey: 'id',
        as: 'type'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product'
  })
  return Product
}