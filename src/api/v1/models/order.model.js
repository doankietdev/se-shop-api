'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Order extends Model {}

Order.init({
  shipAddress: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Order',
  tableName: 'Order'
})

module.exports = Order
