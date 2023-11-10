'use strict'

const { Product } = require('~/api/v1/models')

const getProductById = async (id) => {
  return await Product.findOne({
    where: { id }
  })
}

const getProductsByIds = async (ids = []) => {
  return await Product.findAll({
    where: { id: ids }
  })
}

module.exports = {
  getProductById,
  getProductsByIds
}