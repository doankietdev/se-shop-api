'use strict'

const express = require('express')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const {
  createPaymentForm,
  getAllPaymentForms,
  getPaymentFormById,
  updatePaymentFormById,
  deletePaymentFormById,
  deletePaymentFormByIds
} = require('~/api/v1/controllers/payment.form.controller')
const router = express.Router()

router.get('/', queryStringMiddleware, getAllPaymentForms)
router.post('/', createPaymentForm)
router.delete('/', deletePaymentFormByIds)
router.get('/:id', getPaymentFormById)
router.patch('/:id', updatePaymentFormById)
router.delete('/:id', deletePaymentFormById)

module.exports = router