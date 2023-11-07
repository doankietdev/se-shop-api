'use strict'

const { User } = require('~/api/v1/models')

const createUser = async ({
  roleId, userStatusId, genderId, lastName, firstName,
  imageUrl, phoneNumber, email, address,
  username, password, publicKey, privateKey
}) => {
  return await User.create({
    roleId, userStatusId, genderId, lastName,
    firstName, imageUrl, phoneNumber, email, address,
    username, password, publicKey, privateKey
  })
}

const getUser = async (payload = {}) => {
  return await User.findOne({
    where: payload
  })
}

const getUserByUsername = async ({ username }) => {
  return await User.findOne({
    where: { username }
  })
}

const findOneUser = async({ query }) => {
  return await User.findOne(query)
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  findOneUser
}