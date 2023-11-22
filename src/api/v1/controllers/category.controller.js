'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const categoryService = require('~/api/v1/services/category.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createCategory = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
    metadata: await categoryService.createCategory({ name, description })
  }).send(res)
})

const getAllCategories = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    metadata: await categoryService.getAllCategories({ filter, selector, pagination, sorter })
  }).send(res)
})

const getProductsByCategoryId = asyncHandling(async (req, res) => {
  const id = Number(req.params.id)
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    metadata: await categoryService.getProductsByCategoryId({ categoryId: id, filter, selector, pagination, sorter })
  }).send(res)
})

const getCategoryById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    metadata: await categoryService.getCategoryById({ id })
  }).send(res)
})

const updateCategoryById = asyncHandling( async (req, res) => {
  const id = Number(req.params.id)
  const { name, description } = req.body

  new SuccessResponse({
    metadata: await categoryService.updateCategoryById({ id, name, description })
  }).send(res)
})

const deleteCategoryById = asyncHandling(async (req, res) => {
  const { id } = Number(req.params.id)

  new SuccessResponse({
    metadata: await categoryService.deleteCategoryById({ id })
  }).send(res)
})

const deleteCategoryByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    metadata: await categoryService.deleteCategoryByIds({ ids })
  }).send(res)
})

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByIds,
  getProductsByCategoryId
}