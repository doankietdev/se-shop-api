'use strict'

const { StatusCodes } = require('http-status-codes')
const paymentFormService = require('~/api/v1/services/payment.form.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createPaymentForm = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create payment form successfully',
    metadata: await paymentFormService.createPaymentForm({ name, description })
  }).send(res)
})

const getAllPaymentForms = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  new SuccessResponse({
    message: 'Get payment forms successfully',
    metadata: await paymentFormService.getAllPaymentForms({ filter, selector, pagination, sorter })
  }).send(res)
})

const getPaymentFormById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    message: 'Get payment form successfully',
    metadata: await paymentFormService.getPaymentFormById(id)
  }).send(res)
})

const updatePaymentFormById = asyncHandling( async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  new SuccessResponse({
    message: 'Update payment form successfully',
    metadata: await paymentFormService.updatePaymentFormById(id, { name, description })
  }).send(res)
})

const deletePaymentFormById = asyncHandling(async (req, res) => {
  const { id } = req.params

  new SuccessResponse({
    message: 'Delete payment form successfully',
    metadata: await paymentFormService.deletePaymentFormById(id)
  }).send(res)
})

const deletePaymentFormByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  new SuccessResponse({
    message: 'Delete payment forms successfully',
    metadata: await paymentFormService.deletePaymentFormByIds(ids)
  }).send(res)
})

module.exports = {
  createPaymentForm,
  getAllPaymentForms,
  getPaymentFormById,
  updatePaymentFormById,
  deletePaymentFormById,
  deletePaymentFormByIds
}