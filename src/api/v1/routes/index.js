'use strict'

const express = require('express')
const roleRouter = require('./role')
const genderRouter = require('./gender')
const userStatusRouter = require('./user.status')
const userRouter = require('./user')
const authRouter = require('./auth')

const router = express.Router()

router.use('/auth', authRouter)

router.use('/roles', roleRouter)
router.use('/genders', genderRouter)
router.use('/user-statuses', userStatusRouter)
router.use('/users', userRouter)


module.exports = router