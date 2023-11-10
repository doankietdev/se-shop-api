'use strict'

const { User } = require('~/api/v1/models')

const getUser = async (query = {}) => {
  return await User.findOne(query)
}

module.exports = {
  getUser
}