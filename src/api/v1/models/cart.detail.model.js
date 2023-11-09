'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class CartDetail extends Model {}

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