'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')
const Product = require('./product.model')
const slugify = require('~/api/v1/utils/slugify')

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
