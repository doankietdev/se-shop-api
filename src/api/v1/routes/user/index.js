'use strict'

const express = require('express')
const {
  getAllUsers
} = require('~/api/v1/controllers/user.controller')

const router = express.Router()

router.route('/')
  .get(getAllUsers)

module.exports = router