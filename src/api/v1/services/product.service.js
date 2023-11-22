'use strict'

const lodash = require('lodash')
const { Product, Category } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createProduct = async (reqBody = {}) => {
  try {
    return await Product.create(reqBody)
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }
}

const getAllProducts = async ({ filter, selector, pagination, sorter }) => {
  const bannedFields = ['categoryId']
  lodash.remove(selector, (field) => {
    return bannedFields.includes(field)
  })

  try {
    return await Product.findAll({
      where: filter,
      attributes: selector?.length > 0 ? selector : {
        exclude: bannedFields
      },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] }
      ],
      offset: pagination.skip,
      limit: pagination.limit,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getProductById = async (id) => {
  const product = await Product.findByPk(id)
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, 'No products found')
  return product
}

const updateProductById = async (id, reqBody = {}) => {
  const product = await Product.findOne({
    where: { id }
  })
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, 'No products found')
  return await product.update(reqBody)
}

const deleteProductById = async (id) => {
  const product = await Product.findByPk(id)
  if (!product) throw new ApiError(StatusCodes.NOT_FOUND, 'No products found')
  const { dataValues } = await product.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await getAllProducts()
}

const deleteProductByIds = async (ids = []) => {
  const numberDeletedItems = await Product.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
  return await getAllProducts()
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProductByIds
}