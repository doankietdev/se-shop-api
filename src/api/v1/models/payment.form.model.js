'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class PaymentForm extends Model {}

PaymentForm.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'PaymentForm',
  tableName: 'PaymentForm'
})

module.exports = PaymentForm
