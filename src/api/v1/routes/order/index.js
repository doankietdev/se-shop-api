'use strict'

const express = require('express')
// const { } = require('~/api/v1/controllers/order.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

module.exports = router