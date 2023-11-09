'use strict'

const UserStatus = require('~/api/v1/models/user.status.model')

const getUserStatusByName = async ({ name }) => {
  return await UserStatus.findOne({
    where: { name }
  })
}

module.exports = {
  getUserStatusByName
}