'use strict'

const { WHITELIST_DOMAINS } = require('./constants.config')
const { nodeEnv } = require('./environment.config')
const { NODE_ENV_DEV } = require('./constants.config')
const { StatusCodes } = require('http-status-codes')
const { getCorsDomainByDomain } = require('~/api/v1/services/cors.domain.service')

const ApiError = require('~/core/api.error')

const corsOptions = {
  origin: async function (origin, callback) {
    if (!origin && nodeEnv === NODE_ENV_DEV) {
      return callback(null, true)
    }
    const corsDomain = await getCorsDomainByDomain(origin)
    if (corsDomain) {
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