'use strict'

const express = require('express')
const notFoundMiddleware = require('~/core/not.found.handling')
const genderRouter = require('./gender')
const userStatusRouter = require('./user.status')

const router = express.Router()

router.use('/genders', genderRouter)
router.use('/user-statuses', userStatusRouter)

router.use('/', notFoundMiddleware)

module.exports = router