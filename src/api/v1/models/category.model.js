'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')
const slugify = require('~/api/v1/utils/slugify')

class Category extends Model {
  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
      as: 'products'
    })
  }
}
Category.init({
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
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

module.exports = Category
