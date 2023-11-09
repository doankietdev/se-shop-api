'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      })

      Cart.hasMany(models.CartDetail, {
        foreignKey: 'cartId',
        sourceKey: 'id',
        as: 'products'
      })
    }
  }
  Cart.init({
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Cart'
  })
  return Cart
}