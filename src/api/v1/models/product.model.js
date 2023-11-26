'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Product extends Model {}

Product.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  screen: DataTypes.STRING,
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
  sequelize: mysql.getInstance(),
  modelName: 'Product',
  tableName: 'Product'
})

module.exports = Product