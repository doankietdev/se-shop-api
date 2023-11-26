'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  orderStatusId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  paymentFormId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  shipAddress: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Order',
  tableName: 'Order'
})

module.exports = Order
