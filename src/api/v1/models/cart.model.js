'use strict'

const { Model } = require('sequelize')
const { mysql } = require('~/databases')

class Cart extends Model {}

Cart.init({
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Cart',
  tableName: 'Cart'
})

module.exports = Cart
