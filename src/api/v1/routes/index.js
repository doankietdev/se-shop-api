'use strict'

const express = require('express')
const notFoundMiddleware = require('~/core/not.found.handling')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')
const roleRouter = require('./role')
const genderRouter = require('./gender')
const userStatusRouter = require('./user.status')
const userRouter = require('./user')
const authRouter = require('./auth')

const router = express.Router()

router.use('/auth', authRouter)

router.use(authenticate)

router.use('/roles', roleRouter)
router.use('/genders', genderRouter)
router.use('/user-statuses', userStatusRouter)
router.use('/users', userRouter)

router.use('/', notFoundMiddleware)

module.exports = router