'use strict'

const { OrderStatus } = require('~/api/v1/models')

const getOrderStatusById = async (id) => {
  return await OrderStatus.findOne({
    where: { id }
  })
}

module.exports = {
  getOrderStatusById
}