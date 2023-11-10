'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class OrderStatus extends Model {}

OrderStatus.init({
  name: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'OrderStatus',
  tableName: 'OrderStatus'
})

module.exports = OrderStatus
