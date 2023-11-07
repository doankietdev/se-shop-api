'use strict'

const { User } = require('~/api/v1/models')

const createUser = async ({
  roleId, userStatusId, genderId, lastName, firstName,
  imageUrl, phoneNumber, email, address,
  username, password, publicKey, privateKey
}) => {
  const user = await User.create({
    roleId, userStatusId, genderId, lastName,
    firstName, imageUrl, phoneNumber, email, address,
    username, password, publicKey, privateKey
  })
  return user
}

const getUserByUsername = async ({ username }) => {
  const user = await User.findOne({
    where: { username }
  })
  return user
}

module.exports = {
  createUser,
  getUserByUsername
}