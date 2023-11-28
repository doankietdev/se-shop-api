'use strict'

const { User } = require('~/api/v1/models')

const getUser = async (query = {}) => {
  return await User.findOne(query)
}

const getUserByUsername = async (username = '') => {
  return await User.findOne({
    where: { username }
  })
}

const getUserById = async (id = '') => {
  return await User.findOne({
    where: { id }
  })
}

module.exports = {
  getUser,
  getUserById,
  getUserByUsername
}