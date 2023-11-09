'use strict'

const express = require('express')
const {
  getAllUsers
} = require('~/api/v1/controllers/user.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

// router.use(authenticate)

router.get('/', getAllUsers)

module.exports = router