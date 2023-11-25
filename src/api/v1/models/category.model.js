'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')
const Product = require('./product.model')

class Category extends Model {}

Category.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Category',
  tableName: 'Category'
})

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  sourceKey: 'id',
  as: 'products'
})

module.exports = Category
