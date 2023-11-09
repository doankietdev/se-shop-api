'use strict'

const {
  Model
} = require('sequelize')
const slugify = require('~/api/v1/utils/slugify')

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
    tableName: 'Category',
    hooks: {
      beforeValidate: (category) => {
        if (category.name) {
          category.slug = slugify(category.name + '-' +Date.now())
        }
      }
    }
  })
  return Category
}