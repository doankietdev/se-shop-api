'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const productTypeService = require('~/api/v1/services/product.type.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createProductType = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await productTypeService.createProductType({ name, description })
  }).send(res)
})

const getAllProductTypes = asyncHandling(async (req, res) => {
  new SuccessResponse({
    metadata: await productTypeService.getAllProductTypes()
  }).send(res)
})

const getProductTypeById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await productTypeService.getProductTypeById({ id })
  }).send(res)
})

const updateProductTypeById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  new SuccessResponse({
    metadata: await productTypeService.updateProductTypeById({ id, name, description })
  }).send(res)
})

const deleteProductTypeById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await productTypeService.deleteProductTypeById({ id })
  }).send(res)
})

const deleteProductTypeByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await productTypeService.deleteProductTypeByIds({ ids })
  }).send(res)
})

module.exports = {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductTypeById,
  deleteProductTypeById,
  deleteProductTypeByIds
}