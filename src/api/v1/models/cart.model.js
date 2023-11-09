'use strict'

const { Model } = require('sequelize')
const { mysql } = require('~/databases')

class Cart extends Model {
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
  sequelize: mysql.getInstance(),
  modelName: 'Cart',
  tableName: 'Cart'
})

module.exports = Cart
