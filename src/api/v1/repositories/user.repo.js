'use strict'

const { User } = require('~/api/v1/models')

const getUser = async (query = {}) => {
  return await User.findOne(query)
}

const getUserById = async (id) => {
  return await User.findByPk(id)
}

module.exports = {
  getUser,
  getUserById
}