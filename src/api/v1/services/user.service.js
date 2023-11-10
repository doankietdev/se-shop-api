'use strict'

const { User, UserStatus, Role, Gender } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createUser = async ({
  roleId, userStatusId, genderId, lastName, firstName,
  imageUrl, phoneNumber, email, address,
  username, password, publicKey, privateKey
}) => {
  try {
    return await User.create({
      roleId, userStatusId, genderId, lastName,
      firstName, imageUrl, phoneNumber, email, address,
      username, password, publicKey, privateKey
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }
}

const getAllUsers = async () => {
  return await User.findAll({
    attributes: {
      exclude: ['userStatusId', 'roleId', 'genderId', 'password', 'publicKey', 'privateKey']
    },
    include: [
      { model: UserStatus, as: 'status', attributes: ['id', 'name'] },
      { model: Role, as: 'role', attributes: ['id', 'name'] },
      { model: Gender, as: 'gender', attributes: ['id', 'name'] }
    ]
  })
}

const getUserById = async (id) => {
  const user = await User.findByPk(id)
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return user
}

const getUserByUsername = async ({ username }) => {
  const user = await User.findOne({
    where: { username }
  })
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return user
}

const getUserByEmail = async ({ email }) => {
  return await User.findOne({
    where: { email }
  })
}

const updateUserById = async (id, payload = {}) => {
  const user = await getUserById({ id })
  if (!user) return null

  return await user.update(payload)
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUserById,
  getAllUsers
}