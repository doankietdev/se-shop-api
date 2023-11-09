'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'id',
        as: 'type'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    displayDetails: DataTypes.STRING,
    operatingSystem: DataTypes.STRING,
    processor: DataTypes.STRING,
    ram: DataTypes.INTEGER,
    storage: DataTypes.INTEGER,
    dimensions: DataTypes.STRING,
    weight: DataTypes.DECIMAL(5, 2),
    batteryCapacity: DataTypes.INTEGER,
    frontCameraResolution: DataTypes.STRING,
    rearCameraResolution: DataTypes.STRING,
    connectivity: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.BIGINT,
    stockQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product'
  })
  return Product
}