'use strict'

const express = require('express')
const cors = require('cors')
const { default: helmet } = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const { corsOptions } = require('./config/cors.config')
const { mysql } = require('./databases')
const redirectApiVersion = require('./core/redirect.api.version')
const errorHandlingMiddleware = require('./core/error.handling')

const app = express()

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))

mysql.connect()

app.use('/api', redirectApiVersion)

app.use(errorHandlingMiddleware)

module.exports = app