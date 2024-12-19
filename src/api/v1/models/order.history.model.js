'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class OrderHistory extends Model {}

OrderHistory.init(
  {
    id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    statusId: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: mysql.getInstance(),
    modelName: 'OrderHistory',
    tableName: 'OrderHistory'
  }
)

module.exports = OrderHistory
