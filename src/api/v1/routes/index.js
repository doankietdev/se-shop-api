'use strict'

const express = require('express')
const exampleRouter = require('./example.route')
const notFoundMiddleware = require('~/core/not.found.handling')

const router = express.Router()

router.use('/example', exampleRouter)

router.use('/', notFoundMiddleware)

module.exports = router