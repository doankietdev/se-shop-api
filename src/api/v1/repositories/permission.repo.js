'use strict'

const { Permission } = require('~/api/v1/models')

const getPermissionWithQuery = async (query = {}) => {
  return await Permission.findOne(query)
}

const getPermissionById = async (id) => {
  return await Permission.findOne({
    where: { id }
  })
}

module.exports = {
  getPermissionWithQuery,
  getPermissionById
}