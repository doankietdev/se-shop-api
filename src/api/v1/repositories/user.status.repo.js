'use strict'

const { UserStatus } = require('~/api/v1/models')

const getUserStatusByName = async ({ name }) => {
  return await UserStatus.findOne({
    where: { name }
  })
}

module.exports = {
  getUserStatusByName
}