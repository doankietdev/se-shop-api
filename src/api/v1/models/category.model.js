'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {

    }
  }
  Category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category'
  })
  return Category
}