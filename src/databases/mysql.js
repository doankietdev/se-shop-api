'use strict'

const { Sequelize } = require('sequelize')
const { mysql } = require('~/config/environment.config')

let sequelize = null

const connect = async () => {
  try {
    sequelize = new Sequelize({
      host: mysql.host,
      port: mysql.port,
      database: mysql.databaseName,
      username: mysql.username,
      password: mysql.password,
      logging: false,
      dialect: 'mysql'
    })
    await sequelize.authenticate()
    // eslint-disable-next-line no-console
    console.log('Connected to MySQL successfully')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Connection to MySQL failed')
  }
}

const getInstance = () => {
  if (!sequelize) connect()
  return sequelize
}

module.exports = {
  getInstance
}