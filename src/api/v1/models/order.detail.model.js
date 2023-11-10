'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class OrderDetail extends Model {}

OrderDetail.init({
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  quantity: DataTypes.INTEGER,
  price: DataTypes.BIGINT
}, {
  sequelize: mysql.getInstance(),
  modelName: 'OrderDetail',
  tableName: 'OrderDetail'
})

module.exports = OrderDetail
