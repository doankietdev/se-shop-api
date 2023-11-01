'use strict'

const express = require('express')
const asyncHandler = require('~/core/async.handling')
const SuccessResponse = require('~/core/success.response')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  new SuccessResponse({
    metadata: {
      fullName: 'Doan Anh Kiet'
    }
  }).send(res)
}))

module.exports = router