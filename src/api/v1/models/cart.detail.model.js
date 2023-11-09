'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class CartDetail extends Model {
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
  sequelize: mysql.getInstance(),
  modelName: 'CartDetail',
  tableName: 'CartDetail'
})

module.exports = CartDetail