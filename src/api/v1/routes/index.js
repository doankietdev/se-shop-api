'use strict'

const express = require('express')
const notFoundMiddleware = require('~/core/not.found.handling')
const roleRouter = require('./role')
const genderRouter = require('./gender')
const userStatusRouter = require('./user.status')
const authRouter = require('./auth')

const router = express.Router()

router.use('/roles', roleRouter)
router.use('/genders', genderRouter)
router.use('/user-statuses', userStatusRouter)
router.use('/auth', authRouter)

router.use('/', notFoundMiddleware)

module.exports = router