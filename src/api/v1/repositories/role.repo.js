'use strict'

const Role = require('~/api/v1/models/role.model')

const getRoleByName = async ({ name }) => {
  return await Role.findOne({
    where: { name }
  })
}

module.exports = {
  getRoleByName
}