'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const productService = require('~/api/v1/services/product.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createProduct = asyncHandling(async (req, res) => {
  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await productService.createProduct({ ...req.body, imageUrl: req?.file?.path })
  }).send(res)
})

const getAllProducts = asyncHandling(async (req, res) => {
  new SuccessResponse({
    metadata: await productService.getAllProducts()
  }).send(res)
})

const getProductById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await productService.getProductById(id)
  }).send(res)
})

const updateProductById = asyncHandling( async (req, res) => {
  const id = Number(req.params.id)

  new SuccessResponse({
    metadata: await productService.updateProductById(id, req.body)
  }).send(res)
})

const deleteProductById = asyncHandling(async (req, res) => {
  const id = Number(req.params.id)

  new SuccessResponse({
    metadata: await productService.deleteProductById(id)
  }).send(res)
})

const deleteProductByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await productService.deleteProductByIds(ids)
  }).send(res)
})

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProductByIds
}