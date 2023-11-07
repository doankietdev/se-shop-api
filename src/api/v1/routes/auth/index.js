'use strict'

const express = require('express')
const { validateSignUp, validateSignIn } = require('~/api/v1/validations/auth.validation')
const {
  signUp,
  signIn
}= require('~/api/v1/controllers/auth.controller')

const router = express.Router()

router.post('/sign-up', validateSignUp, signUp)
router.post('/sign-in', validateSignIn, signIn)

module.exports = router