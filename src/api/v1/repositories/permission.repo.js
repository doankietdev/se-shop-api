'use strict'

const { Permission } = require('~/api/v1/models')

const getPermissionWithQuery = async (query = {}) => {
  return await Permission.findOne(query)
}

module.exports = {
  getPermissionWithQuery
}