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

const updateProductById = async (id, payload = {}) => {
  const product = await getProductById(id)
  if (!product) return null
  return await product.update(payload)
}

const increaseStockQuantiy = async (id, quantity = 0) => {
  const product = await getProductById(id)
  if (!product) return null
  return await product.update({ stockQuantity: product.stockQuantity + quantity })
}

module.exports = {
  getProductById,
  getProductsByIds,
  updateProductById,
  increaseStockQuantiy
}