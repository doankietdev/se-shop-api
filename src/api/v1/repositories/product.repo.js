'use strict'

const { Product } = require('~/api/v1/models')

const getProductById = async (id) => {
  return await Product.findOne({
    where: { id }
  })
}

module.exports = {
  getProductById
}