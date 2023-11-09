'use strict'

const express = require('express')
const roleRouter = require('./role')
const genderRouter = require('./gender')
const userStatusRouter = require('./user.status')
const userRouter = require('./user')
const authRouter = require('./auth')
const categoryRouter = require('./category')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/roles', roleRouter)
router.use('/genders', genderRouter)
router.use('/user-statuses', userStatusRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)

module.exports = router