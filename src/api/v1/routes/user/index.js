'use strict'

const express = require('express')
const {
  getAllUsers,
  getUserById,
  updateUserById,
  updateStatus,
  deleteUserById
} = require('~/api/v1/controllers/user.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const { uploadAvatarMiddleware } = require('~/api/v1/middlewares/upload.cloud.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllUsers)
router.get('/get-info', getUserById)
router.patch('/', uploadAvatarMiddleware, updateUserById)
router.patch('/:id/update-status', uploadAvatarMiddleware, updateStatus)
router.delete('/:id', deleteUserById)

module.exports = router