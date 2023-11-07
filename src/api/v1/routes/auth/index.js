'use strict'

const express = require('express')
const {
  signUp
}= require('~/api/v1/controllers/auth.controller')

const router = express.Router()

router.post('/signup', signUp)

module.exports = router