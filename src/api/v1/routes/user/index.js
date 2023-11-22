'use strict'

const express = require('express')
const {
  getAllUsers,
  updateUserById,
  updateStatus
} = require('~/api/v1/controllers/user.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const { uploadAvatarMiddleware } = require('~/api/v1/middlewares/upload.cloud.middleware')
const { authenticate } = require('~/api/v1/middlewares/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/', queryStringMiddleware, getAllUsers)
router.patch('/', uploadAvatarMiddleware, updateUserById)
router.patch('/:id/update-status', uploadAvatarMiddleware, updateStatus)

module.exports = router