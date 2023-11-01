'use strict'

const { mysql } = require('./environment.config')

module.exports = {
  development: {
    username: mysql.username,
    password: mysql.password,
    database: mysql.databaseName,
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: mysql.username,
    password: mysql.password,
    database: mysql.databaseName,
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: mysql.username,
    password: mysql.password,
    database: mysql.databaseName,
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}