'use strict'

const Gender = require('~/api/v1/models/gender.model')

const getGenderByName = async ({ name }) => {
  return await Gender.findOne({
    where: { name }
  })
}

module.exports = {
  getGenderByName
}