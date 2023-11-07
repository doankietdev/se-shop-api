'use strict'

const express = require('express')
const { validateSignUp } = require('~/api/v1/validations/auth.validation')
const {
  signUp
}= require('~/api/v1/controllers/auth.controller')

const router = express.Router()

router.post('/signup', validateSignUp, signUp)

module.exports = router