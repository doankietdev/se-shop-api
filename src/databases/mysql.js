'use strict'

const { Sequelize } = require('sequelize')
const { mysql } = require('~/config/environment.config')

const sequelize = new Sequelize({
  host: mysql.host,
  port: mysql.port,
  database: mysql.databaseName,
  username: mysql.username,
  password: mysql.password,
  logging: false,
  dialect: 'mysql'
})

const connect = async () => {
  try {
    await sequelize.authenticate()
    // eslint-disable-next-line no-console
    console.log('Connected to MySQL successfully')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Connection to MySQL failed')
  }
}

module.exports = {
  connect
}