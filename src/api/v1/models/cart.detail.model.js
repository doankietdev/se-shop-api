'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      CartDetail.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        targetKey: 'id',
        as: 'cart'
      })

      CartDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        targetKey: 'id',
        as: 'product'
      })
    }
  }
  CartDetail.init({
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartDetail',
    tableName: 'CartDetail'
  })
  return CartDetail
}