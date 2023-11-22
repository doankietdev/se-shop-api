'use strict'

const express = require('express')
const {
  getAllUsers,
  updateUserById
} = require('~/api/v1/controllers/user.controller')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')
const { uploadAvatarMiddleware } = require('~/api/v1/middlewares/uploadCloudMiddleware')

const router = express.Router()

router.use(authenticate)

router.get('/', getAllUsers)
router.patch('/', uploadAvatarMiddleware, updateUserById)

module.exports = router