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

const getUserById = async ({ id }) => {
  return await User.findByPk(id)
}

const getUserByUsername = async ({ username }) => {
  return await User.findOne({
    where: { username }
  })
}

const getUserByEmail = async ({ email }) => {
  return await User.findOne({
    where: { email }
  })
}

const findOneUser = async(query) => {
  return await User.findOne(query)
}

const updateUserById = async (id, payload = {}) => {
  const user = await getUserById({ id })
  if (!user) return null

  return await user.update(payload)
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  findOneUser,
  updateUserById
}