'use strict'

const { WHITELIST_DOMAINS } = require('./constants.config')
const { nodeEnv } = require('./environment.config')
const { NODE_ENV_DEV } = require('./constants.config')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && nodeEnv === NODE_ENV_DEV) {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy`))
  },

  optionsSuccessStatus: 200,
  credentials: true
}

module.exports = {
  corsOptions
}