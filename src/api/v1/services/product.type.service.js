'use strict'

const { ProductType } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createProductType = async ({ name, description }) => {
  const productType = await ProductType.create({ name, description })
  if (!productType) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  return productType
}

const getAllProductTypes = async () => {
  return await ProductType.findAll()
}

const getProductTypeById = async ({ id }) => {
  const productType = await ProductType.findByPk(id)
  if (!productType) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return productType
}

const updateProductTypeById = async ({ id, name, description }) => {
  const productType = await ProductType.findOne({
    where: { id }
  })
  if (!productType) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return await productType.update({ name, description })
}

const deleteProductTypeById = async ({ id }) => {
  const productType = await ProductType.findByPk(id)
  if (!productType) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  const { dataValues } = await productType.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  return await getAllProductTypes()
}

const deleteProductTypeByIds = async ({ ids }) => {
  const numberDeletedItems = await ProductType.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
  return await getAllProductTypes()
}

module.exports = {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductTypeById,
  deleteProductTypeById,
  deleteProductTypeByIds
}